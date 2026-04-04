const path = require('path');
const fs = require('fs');

const EXPERT_PACK_ROOT = 'G:/Workspace/amazing_agent_specialist';
const PLATFORM_ADAPTER_PATH = path.join(EXPERT_PACK_ROOT, 'adapters/platform');

const results = [];

function log(step, passed, details = '') {
  results.push({ step, passed, details });
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${step}`);
  if (details) console.log(`   ${details}`);
}

function verifyDiscoverability() {
  console.log('\n=== Step 1: 发现性验证 ===\n');

  const agentsPath = path.join(EXPERT_PACK_ROOT, 'AGENTS.md');
  const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
  
  log('AGENTS.md 包含 getPlatformAdapter', agentsContent.includes('getPlatformAdapter'));
  log('AGENTS.md 包含 Runtime API section', agentsContent.includes('Runtime API'));

  const guidePath = path.join(EXPERT_PACK_ROOT, 'docs/platform-adapter-guide.md');
  log('platform-adapter-guide.md 存在', fs.existsSync(guidePath));

  if (fs.existsSync(guidePath)) {
    const guideContent = fs.readFileSync(guidePath, 'utf-8');
    log('文档使用正确字段名 override_category', guideContent.includes('override_category'));
    log('文档使用正确字段名 additional_skills', guideContent.includes('additional_skills'));
  }
}

function verifyImportPaths() {
  console.log('\n=== Step 2: 导入路径验证 ===\n');

  const indexPath = path.join(PLATFORM_ADAPTER_PATH, 'index.ts');
  log('adapters/platform/index.ts 存在', fs.existsSync(indexPath));

  const runtimePath = path.join(PLATFORM_ADAPTER_PATH, 'runtime.ts');
  log('adapters/platform/runtime.ts 存在', fs.existsSync(runtimePath));

  const packageJsonPath = path.join(EXPERT_PACK_ROOT, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    log('package.json 有 exports 字段', !!packageJson.exports);
  }
}

function verifyRuntimeAPI() {
  console.log('\n=== Step 3: 运行时 API 验证 ===\n');

  const runtimePath = path.join(PLATFORM_ADAPTER_PATH, 'runtime.ts');
  if (!fs.existsSync(runtimePath)) return;

  const content = fs.readFileSync(runtimePath, 'utf-8');

  ['getPlatformAdapter', 'getSupportedPlatforms', 'clearCache', 'setProjectRoot'].forEach(fn => {
    log(`导出 ${fn}`, content.includes(fn));
  });

  ['PlatformNotSupportedError', 'ConfigLoadError', 'InvalidRoleError'].forEach(err => {
    log(`导出错误类 ${err}`, content.includes(err));
  });
}

function verifyIndexExports() {
  console.log('\n=== Step 4: index.ts 导出验证 ===\n');

  const indexPath = path.join(PLATFORM_ADAPTER_PATH, 'index.ts');
  if (!fs.existsSync(indexPath)) return;

  const content = fs.readFileSync(indexPath, 'utf-8');

  log('导出 getTaskConfig', content.includes('getTaskConfig'));

  ['Role', 'Category', 'SkillId', 'PlatformAdapter'].forEach(t => {
    log(`导出类型 ${t}`, content.includes(t));
  });
}

function verifyOpenCodeAdapter() {
  console.log('\n=== Step 5: OpenCode Adapter 配置验证 ===\n');

  const opencodePath = path.join(PLATFORM_ADAPTER_PATH, 'opencode');
  log('opencode 目录存在', fs.existsSync(opencodePath));

  if (fs.existsSync(opencodePath)) {
    const roleMappingPath = path.join(opencodePath, 'role-mapping.json');
    log('role-mapping.json 存在', fs.existsSync(roleMappingPath));

    if (fs.existsSync(roleMappingPath)) {
      const roleMapping = JSON.parse(fs.readFileSync(roleMappingPath, 'utf-8'));
      ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'].forEach(role => {
        log(`${role} 角色映射存在`, !!roleMapping.role_mapping?.[role]);
      });
    }

    const capabilitiesPath = path.join(opencodePath, 'capabilities.json');
    log('capabilities.json 存在', fs.existsSync(capabilitiesPath));
  }
}

function verifyProjectOverride() {
  console.log('\n=== Step 6: 项目级覆盖验证 ===\n');

  const overridePath = path.join(process.cwd(), '.opencode/platform-override.json');
  log('.opencode/platform-override.json 存在', fs.existsSync(overridePath));

  if (fs.existsSync(overridePath)) {
    const override = JSON.parse(fs.readFileSync(overridePath, 'utf-8'));
    log('配置格式正确', !!override.overrides);
  }
}

function generateReport() {
  console.log('\n' + '='.repeat(50));
  console.log('验证报告');
  console.log('='.repeat(50) + '\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  console.log(`总计: ${passed}/${total} 通过`);
  console.log(`通过率: ${((passed / total) * 100).toFixed(1)}%\n`);

  if (failed > 0) {
    console.log('失败项:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.step}`);
    });
  }

  console.log('\n验证结论:');
  if (failed === 0) {
    console.log('✅ Platform Adapter 完全可用，所有验证项通过');
  } else if (passed >= total * 0.8) {
    console.log('⚠️ Platform Adapter 基本可用，有少量问题需要修复');
  } else {
    console.log('❌ Platform Adapter 存在问题，需要修复后重新验证');
  }
}

console.log('Platform Adapter 验证开始');
console.log('专家包路径:', EXPERT_PACK_ROOT);
console.log('测试项目路径:', process.cwd());

verifyDiscoverability();
verifyImportPaths();
verifyRuntimeAPI();
verifyIndexExports();
verifyOpenCodeAdapter();
verifyProjectOverride();
generateReport();
