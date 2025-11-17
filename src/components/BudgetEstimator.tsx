import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ProjectType = 'Website' | 'Mobile app' | 'API' | 'AI';
type Complexity = 'Basic' | 'Medium' | 'Complex';

interface EstimateResult {
  min: number;
  max: number;
}

export const BudgetEstimator = () => {
  const [projectType, setProjectType] = useState<ProjectType>('Website');
  const [complexity, setComplexity] = useState<Complexity>('Medium');
  const [integrations, setIntegrations] = useState(0);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const calculateEstimate = () => {
    const baseByType: Record<ProjectType, number> = {
      Website: 3,
      'Mobile app': 6,
      API: 4,
      AI: 8,
    };

    const complexityFactor: Record<Complexity, number> = {
      Basic: 1,
      Medium: 1.8,
      Complex: 2.8,
    };

    const base = baseByType[projectType];
    const factor = complexityFactor[complexity];
    const integrationCost = integrations * 0.5;

    const min = Math.round((base + integrationCost) * factor * 1_000_000);
    const max = Math.round(min * 1.5);

    setResult({ min, max });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="text-primary font-mono text-sm glow-primary">$ ./estimate_project.sh</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Quick Budget <span className="text-primary glow-primary">Estimator</span>
            </h2>
            <p className="text-muted-foreground">
              Get an instant estimate for your project. Real developers, real results.
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-primary/20 box-glow-primary">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="project-type" className="text-foreground mb-2 block">
                  Project Type
                </Label>
                <Select value={projectType} onValueChange={(v) => setProjectType(v as ProjectType)}>
                  <SelectTrigger id="project-type" className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Mobile app">Mobile app</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="AI">AI Solution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="complexity" className="text-foreground mb-2 block">
                  Complexity
                </Label>
                <Select value={complexity} onValueChange={(v) => setComplexity(v as Complexity)}>
                  <SelectTrigger id="complexity" className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Complex">Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="integrations" className="text-foreground mb-2 block">
                  Number of Integrations
                </Label>
                <Input
                  id="integrations"
                  type="number"
                  min="0"
                  value={integrations}
                  onChange={(e) => setIntegrations(parseInt(e.target.value) || 0)}
                  className="bg-background border-border"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  APIs, payment gateways, third-party services, etc.
                </p>
              </div>
            </div>

            <Button
              onClick={calculateEstimate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
            >
              {'>'} Calculate Estimate
            </Button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 overflow-hidden"
                >
                  <Card className="p-6 bg-primary/5 border-primary/30">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2 font-mono">
                        Estimated Budget Range
                      </p>
                      <p className="text-3xl font-bold text-primary glow-primary mb-1">
                        {formatCurrency(result.min)} - {formatCurrency(result.max)}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        *Estimate may vary based on specific requirements
                      </p>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {'>'} Request Discovery Call
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
