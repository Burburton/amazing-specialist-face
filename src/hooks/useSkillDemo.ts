import { useState, useEffect, useCallback } from 'react';
import type { SkillDemo } from '../types/skill-demo';

interface UseSkillDemoResult {
  demo: SkillDemo | null;
  loading: boolean;
  error: string | null;
}

const demoCache: Record<string, SkillDemo> = {};

async function loadDemo(skillId: string): Promise<SkillDemo | null> {
  if (demoCache[skillId]) {
    return demoCache[skillId];
  }

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}skill-demos/${skillId}.json`);
    if (!response.ok) {
      return null;
    }
    const demo: SkillDemo = await response.json();
    demoCache[skillId] = demo;
    return demo;
  } catch {
    return null;
  }
}

export function useSkillDemo(skillId: string | undefined): UseSkillDemoResult {
  const [demo, setDemo] = useState<SkillDemo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!skillId) {
      setDemo(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadDemo(skillId)
      .then((loadedDemo) => {
        setDemo(loadedDemo);
        if (!loadedDemo) {
          setError('Demo not available for this skill');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load demo');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [skillId]);

  return { demo, loading, error };
}

export function useDemoInputs(demo: SkillDemo | null) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (demo) {
      const defaults: Record<string, string> = {};
      demo.inputs.forEach((input) => {
        defaults[input.name] = input.default_value;
      });
      setInputValues(defaults);
    }
  }, [demo]);

  const updateInput = useCallback((name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetInputs = useCallback(() => {
    if (demo) {
      const defaults: Record<string, string> = {};
      demo.inputs.forEach((input) => {
        defaults[input.name] = input.default_value;
      });
      setInputValues(defaults);
    }
  }, [demo]);

  return { inputValues, updateInput, resetInputs };
}