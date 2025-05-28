import React, { useState } from 'react';
import { Button, TextBox } from './index';

const ShowcasePanel: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [customNoiseOpacity, setCustomNoiseOpacity] = useState(0.3);
  const [customGradientFrom, setCustomGradientFrom] = useState('var(--gradient-overlay)');
  const [customGradientTo, setCustomGradientTo] = useState('transparent');

  return (
    <div className="bg-theme-bg-secondary rounded-2xl p-6 backdrop-blur-sm shadow-theme-panel border border-theme-border-primary relative overflow-hidden">
      <div className="absolute inset-0 noise mix-blend-overlay opacity-30 rounded-2xl" />
      
      <div className="relative space-y-8">
        <h2 className="font-['Chakra_Petch'] text-4xl font-bold text-theme-text-primary mb-6 tracking-wider uppercase">
          Component Showcase
        </h2>

        {/* TextBox Variants */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">TextBox Variants</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextBox
                placeholder="Primary variant"
                variant="primary"
                enableNoise={false}
                enableGradient={true}
              />
              <TextBox
                placeholder="Secondary variant"
                variant="secondary"
                enableNoise={true}
                noiseOpacity={0.2}
                enableGradient={true}
              />
              <TextBox
                placeholder="Tertiary variant"
                variant="tertiary"
                enableNoise={true}
                noiseOpacity={0.4}
                enableGradient={false}
              />
            </div>
          </div>
        </section>



        {/* Button Variants */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" enableGradient={true} enableNoise={false}>
              Primary
            </Button>
            <Button variant="secondary" enableGradient={true} enableNoise={true} noiseOpacity={0.25}>
              Secondary
            </Button>
            <Button variant="tertiary" enableGradient={false} enableNoise={true} noiseOpacity={0.4}>
              Tertiary
            </Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Button Sizes</h3>
          <div className="flex flex-wrap gap-4 items-end">
            <Button size="sm" enableGradient={true} enableNoise={true} noiseOpacity={0.3}>
              Small
            </Button>
            <Button size="md" enableGradient={true} enableNoise={true} noiseOpacity={0.3}>
              Medium
            </Button>
            <Button size="lg" enableGradient={true} enableNoise={true} noiseOpacity={0.3}>
              Large
            </Button>
          </div>
        </section>

        {/* Noise Opacity Examples */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Noise Opacity Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button enableNoise={true} noiseOpacity={0.1} enableGradient={true}>
              Noise 0.1
            </Button>
            <Button enableNoise={true} noiseOpacity={0.3} enableGradient={true}>
              Noise 0.3
            </Button>
            <Button enableNoise={true} noiseOpacity={0.5} enableGradient={true}>
              Noise 0.5
            </Button>
            <Button enableNoise={true} noiseOpacity={0.7} enableGradient={true}>
              Noise 0.7
            </Button>
          </div>
        </section>

        {/* Gradient Examples */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Gradient Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              enableGradient={true} 
              gradientFrom="var(--gradient-overlay)" 
              gradientTo="transparent"
              enableNoise={false}
            >
              Standard Gradient
            </Button>
            <Button 
              enableGradient={true} 
              gradientFrom="var(--gradient-overlay-alt)" 
              gradientTo="transparent"
              enableNoise={false}
            >
              Alt Gradient
            </Button>
            <Button 
              enableGradient={true} 
              gradientFrom="var(--gradient-overlay-strong)" 
              gradientTo="transparent"
              enableNoise={false}
            >
              Strong Gradient
            </Button>
          </div>
        </section>

        {/* Combined Effects */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Combined Effects</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <TextBox
                placeholder="Heavy noise + strong gradient"
                enableNoise={true}
                noiseOpacity={0.6}
                enableGradient={true}
                gradientFrom="var(--gradient-overlay-strong)"
                gradientTo="transparent"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
              <Button 
                enableNoise={true} 
                noiseOpacity={0.6}
                enableGradient={true}
                gradientFrom="var(--gradient-overlay-strong)"
                gradientTo="transparent"
              >
                Matching Button
              </Button>
            </div>
            
            <div className="flex gap-4">
              <TextBox
                placeholder="Subtle effects"
                enableNoise={true}
                noiseOpacity={0.15}
                enableGradient={true}
                gradientFrom="var(--gradient-overlay-alt)"
                gradientTo="transparent"
              />
              <Button 
                enableNoise={true} 
                noiseOpacity={0.15}
                enableGradient={true}
                gradientFrom="var(--gradient-overlay-alt)"
                gradientTo="transparent"
              >
                Subtle Button
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Customization */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Interactive Customization</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-theme-text-tertiary mb-2">
                  Noise Opacity: {customNoiseOpacity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={customNoiseOpacity}
                  onChange={(e) => setCustomNoiseOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-theme-text-tertiary mb-2">
                  Gradient From
                </label>
                <select
                  value={customGradientFrom}
                  onChange={(e) => setCustomGradientFrom(e.target.value)}
                  className="w-full px-3 py-2 bg-theme-bg-tertiary text-theme-text-secondary rounded border border-theme-border-secondary"
                >
                  <option value="var(--gradient-overlay)">Standard</option>
                  <option value="var(--gradient-overlay-alt)">Alternative</option>
                  <option value="var(--gradient-overlay-strong)">Strong</option>
                  <option value="rgba(255, 255, 255, 0.1)">White</option>
                  <option value="rgba(0, 0, 0, 0.2)">Black</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-theme-text-tertiary mb-2">
                  Gradient To
                </label>
                <select
                  value={customGradientTo}
                  onChange={(e) => setCustomGradientTo(e.target.value)}
                  className="w-full px-3 py-2 bg-theme-bg-tertiary text-theme-text-secondary rounded border border-theme-border-secondary"
                >
                  <option value="transparent">Transparent</option>
                  <option value="rgba(0, 0, 0, 0.1)">Black 10%</option>
                  <option value="rgba(255, 255, 255, 0.05)">White 5%</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <TextBox
                placeholder="Live customization preview"
                enableNoise={true}
                noiseOpacity={customNoiseOpacity}
                enableGradient={true}
                gradientFrom={customGradientFrom}
                gradientTo={customGradientTo}
              />
              <Button 
                enableNoise={true} 
                noiseOpacity={customNoiseOpacity}
                enableGradient={true}
                gradientFrom={customGradientFrom}
                gradientTo={customGradientTo}
              >
                Preview
              </Button>
            </div>
          </div>
        </section>

        {/* Sound Examples */}
        <section>
          <h3 className="text-xl font-semibold text-theme-text-secondary mb-4">Sound Effects</h3>
          <div className="flex flex-wrap gap-4">
            <Button soundEnabled={true} soundType="click" enableGradient={true}>
              Click Sound
            </Button>
            <Button soundEnabled={true} soundType="tick" enableGradient={true}>
              Tick Sound
            </Button>
            <Button soundEnabled={true} soundType="whoosh" enableGradient={true}>
              Whoosh Sound
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShowcasePanel;