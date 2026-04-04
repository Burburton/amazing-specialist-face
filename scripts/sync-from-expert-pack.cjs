const fs = require('fs');
const path = require('path');

const DEFAULT_EXPERT_PACK_PATH = '../amazing-specialists';
const OUTPUT_DIR = 'src/data';

function parseRoles(content) {
  const roles = [];
  const roleSections = content.split(/^# \d+\.\s+(\w+)/m).slice(1);
  
  for (let i = 0; i < roleSections.length; i += 2) {
    const roleName = roleSections[i].trim();
    const roleContent = roleSections[i + 1];
    if (!roleContent) continue;
    
    const missionMatch = roleContent.match(/## Mission\n([\s\S]*?)(?=\n## )/);
    const inScopeMatch = roleContent.match(/## In Scope\n([\s\S]*?)(?=\n## )/);
    const outOfScopeMatch = roleContent.match(/## Out of Scope\n([\s\S]*?)(?=\n## )/);
    const triggerMatch = roleContent.match(/## Trigger Conditions\n([\s\S]*?)(?=\n## )/);
    
    const parseList = (text) => {
      if (!text) return [];
      return text.split('\n')
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(line => line.length > 0);
    };
    
    roles.push({
      name: roleName,
      mission: missionMatch ? missionMatch[1].trim() : '',
      inScope: parseList(inScopeMatch ? inScopeMatch[1] : ''),
      outOfScope: parseList(outOfScopeMatch ? outOfScopeMatch[1] : ''),
      triggerConditions: parseList(triggerMatch ? triggerMatch[1] : ''),
      skills: []
    });
  }
  return roles;
}

function parseSkills(expertPackPath) {
  const skills = [];
  const skillsDir = path.join(expertPackPath, '.opencode/skills');
  
  if (!fs.existsSync(skillsDir)) return skills;
  
  const roleDirs = fs.readdirSync(skillsDir).filter(f => 
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  );
  
  const m4Skills = ['interface-contract-design', 'migration-planning', 'refactor-safely', 
    'dependency-minimization', 'integration-test-design', 'flaky-test-diagnosis',
    'performance-test-design', 'benchmark-analysis', 'load-test-orchestration',
    'performance-regression-analysis', 'maintainability-review', 'risk-review',
    'architecture-doc-sync', 'user-guide-update', 'secret-handling-review',
    'dependency-risk-review'];
  
  for (const roleDir of roleDirs) {
    const rolePath = path.join(skillsDir, roleDir);
    const skillDirs = fs.readdirSync(rolePath).filter(f => 
      fs.statSync(path.join(rolePath, f)).isDirectory()
    );
    
    for (const skillDir of skillDirs) {
      const skillFile = path.join(rolePath, skillDir, 'SKILL.md');
      if (!fs.existsSync(skillFile)) continue;
      
      const content = fs.readFileSync(skillFile, 'utf-8');
      const nameMatch = content.match(/^# Skill:\s*(.+)$/m);
      const purposeMatch = content.match(/## Purpose\n\n([\s\S]*?)(?=\n## )/);
      let description = purposeMatch ? purposeMatch[1].trim() : '';
      description = description.split('\n\n')[0];
      
      skills.push({
        id: roleDir + '/' + skillDir,
        name: nameMatch ? nameMatch[1].trim() : skillDir,
        role: roleDir,
        category: m4Skills.includes(skillDir) ? 'M4' : 'MVP',
        description,
        path: '.opencode/skills/' + roleDir + '/' + skillDir + '/SKILL.md'
      });
    }
  }
  return skills;
}

function loadContracts(expertPackPath) {
  const registryPath = path.join(expertPackPath, 'contracts/pack/registry.json');
  if (!fs.existsSync(registryPath)) return [];
  
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  return registry.contracts.map(c => ({
    contract_id: c.contract_id,
    contract_name: c.contract_name,
    producer_role: c.producer_role,
    consumer_roles: c.consumer_roles,
    description: c.description
  }));
}

function getDefaultCommands() {
  return [
    { name: 'spec-start', description: 'Create or refine a feature spec', inputs: ['feature name or ID', '--enhanced (optional)'], outputs: ['specs/<feature>/spec.md', 'unresolved ambiguities', 'next recommended command'] },
    { name: 'spec-plan', description: 'Create or refine a feature implementation plan', inputs: ['feature name or ID', '--enhanced (optional)'], outputs: ['specs/<feature>/plan.md', 'implementation phases', 'risk assessment'] },
    { name: 'spec-tasks', description: 'Create or refine task breakdown for a feature', inputs: ['feature name or ID', '--enhanced (optional)'], outputs: ['specs/<feature>/tasks.md', 'task list', 'dependency graph'] },
    { name: 'spec-implement', description: 'Execute implementation tasks for a feature', inputs: ['feature name or ID', 'task ID (optional)', '--enhanced (optional)'], outputs: ['code changes', 'implementation summary', 'test results'] },
    { name: 'spec-audit', description: 'Audit feature completion against spec and governance rules', inputs: ['feature name or ID', '--enhanced (optional)'], outputs: ['audit report', 'findings', 'recommendations'] }
  ];
}

async function syncData(expertPackPath) {
  console.log('Checking expert pack at:', expertPackPath);
  
  if (!fs.existsSync(expertPackPath)) {
    console.log('Expert pack not found. Keeping existing data.');
    console.log('To sync data, ensure expert pack is available at:', expertPackPath);
    return;
  }
  
  const roleDefPath = path.join(expertPackPath, 'role-definition.md');
  const skillsDir = path.join(expertPackPath, '.opencode/skills');
  const contractsPath = path.join(expertPackPath, 'contracts/pack/registry.json');
  
  if (!fs.existsSync(roleDefPath) && !fs.existsSync(skillsDir) && !fs.existsSync(contractsPath)) {
    console.log('Expert pack found but no data files. Keeping existing data.');
    return;
  }
  
  console.log('Syncing data from:', expertPackPath);
  console.log('Output directory:', OUTPUT_DIR);
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  console.log('Syncing roles...');
  if (fs.existsSync(roleDefPath)) {
    const roles = parseRoles(fs.readFileSync(roleDefPath, 'utf-8'));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'roles.json'), JSON.stringify({ roles, total: roles.length }, null, 2));
    console.log('  Done:', roles.length, 'roles');
  } else {
    console.log('  Skipped: role-definition.md not found');
  }
  
  console.log('Syncing skills...');
  const skills = parseSkills(expertPackPath);
  if (skills.length > 0) {
    const mvpCount = skills.filter(s => s.category === 'MVP').length;
    const m4Count = skills.filter(s => s.category === 'M4').length;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'skills.json'), JSON.stringify({ skills, total: skills.length, mvpCount, m4Count }, null, 2));
    console.log('  Done:', skills.length, 'skills');
  } else {
    console.log('  Skipped: no skills found (keeping existing data)');
  }
  
  console.log('Syncing contracts...');
  const contracts = loadContracts(expertPackPath);
  if (contracts.length > 0) {
    fs.writeFileSync(path.join(OUTPUT_DIR, 'contracts.json'), JSON.stringify({ contracts, total: contracts.length }, null, 2));
    console.log('  Done:', contracts.length, 'contracts');
  } else {
    console.log('  Skipped: no contracts found (keeping existing data)');
  }
  
  console.log('Syncing commands...');
  const commands = getDefaultCommands();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'commands.json'), JSON.stringify({ commands, total: commands.length }, null, 2));
  console.log('  Done:', commands.length, 'commands');
  
  console.log('Generating stats...');
  const stats = {
    totalSkills: skills.length,
    mvpSkills: skills.filter(s => s.category === 'MVP').length,
    m4Skills: skills.filter(s => s.category === 'M4').length,
    totalRoles: 6,
    totalContracts: contracts.length,
    totalCommands: 5,
    totalFeatures: 27,
    syncedAt: new Date().toISOString()
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'stats.json'), JSON.stringify(stats, null, 2));
  
  console.log('Sync complete!');
}

const args = process.argv.slice(2);
let expertPackPath = process.env.EXPERT_PACK_PATH || DEFAULT_EXPERT_PACK_PATH;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--expert-pack' && args[i + 1]) {
    expertPackPath = args[i + 1];
    i++;
  }
}

syncData(path.resolve(expertPackPath)).catch(err => {
  console.error('Error:', err.message);
  process.exit(0);
});