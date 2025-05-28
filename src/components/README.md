# Customizable Components Documentation

This directory contains highly customizable React components with advanced theming, noise textures, gradients, and sound effects.

## Components

### TextBox

A customizable input component with noise texture and gradient overlay support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `noiseOpacity` | `number` | `0.3` | Opacity of the noise texture overlay (0-1) |
| `gradientFrom` | `string` | `'var(--gradient-overlay)'` | Starting color of the gradient |
| `gradientTo` | `string` | `'transparent'` | Ending color of the gradient |
| `enableGradient` | `boolean` | `false` | Whether to show gradient overlay |
| `enableNoise` | `boolean` | `false` | Whether to show noise texture overlay |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style variant |

| ...rest | `InputHTMLAttributes` | - | All standard input props |

#### Usage Examples

```tsx
// Basic usage
<TextBox placeholder="Enter text..." />

// With noise texture
<TextBox 
  placeholder="Noisy input"
  enableNoise={true}
  noiseOpacity={0.4}
/>

// With gradient overlay
<TextBox 
  placeholder="Gradient input"
  enableGradient={true}
  gradientFrom="rgba(255, 255, 255, 0.1)"
  gradientTo="transparent"
/>

// Full customization
<TextBox 
  placeholder="Fully customized"
  variant="secondary"
  enableNoise={true}
  noiseOpacity={0.3}
  enableGradient={true}
  gradientFrom="var(--gradient-overlay-strong)"
  gradientTo="transparent"
/>
```

### Button

A customizable button component with noise texture, gradient overlay, and sound effects.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `noiseOpacity` | `number` | `0.3` | Opacity of the noise texture overlay (0-1) |
| `gradientFrom` | `string` | `'var(--gradient-overlay)'` | Starting color of the gradient |
| `gradientTo` | `string` | `'transparent'` | Ending color of the gradient |
| `enableGradient` | `boolean` | `true` | Whether to show gradient overlay |
| `enableNoise` | `boolean` | `false` | Whether to show noise texture overlay |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `soundEnabled` | `boolean` | `false` | Whether to play sound on click |
| `soundType` | `'click' \| 'tick' \| 'whoosh'` | `'click'` | Type of sound to play |
| `muted` | `boolean` | `false` | Whether sounds are muted |
| `children` | `ReactNode` | - | Button content |
| ...rest | `ButtonHTMLAttributes` | - | All standard button props |

#### Usage Examples

```tsx
// Basic usage
<Button>Click me</Button>

// With sound effects
<Button 
  soundEnabled={true}
  soundType="whoosh"
  muted={false}
>
  Whoosh Button
</Button>

// With noise texture
<Button 
  enableNoise={true}
  noiseOpacity={0.5}
  enableGradient={true}
>
  Textured Button
</Button>

// Full customization
<Button 
  variant="tertiary"
  size="lg"
  enableNoise={true}
  noiseOpacity={0.4}
  enableGradient={true}
  gradientFrom="var(--gradient-overlay-alt)"
  gradientTo="rgba(0, 0, 0, 0.1)"
  soundEnabled={true}
  soundType="click"
>
  Custom Button
</Button>
```

## Variants

### Primary
- Uses `bg-theme-bg-tertiary` background
- `text-theme-text-secondary` text color
- `border-theme-border-secondary` border
- Best for main actions

### Secondary
- Uses `bg-theme-bg-secondary` background
- `text-theme-text-primary` text color
- `border-theme-border-primary` border
- Good for secondary actions

### Tertiary
- Uses `bg-theme-bg-primary` background
- `text-theme-text-tertiary` text color
- `border-theme-border-tertiary` border
- Subtle, minimal styling

## Sizes

TextBox components have a fixed size (height: 12, padding: 16px, font-size: base) to maintain consistency.

### Button Sizes

### Small (`sm`)
- Height: 8 (2rem)
- Padding: 16px
- Font size: small

### Medium (`md`) - Default
- Height: 12 (3rem)
- Padding: 24px
- Font size: base

### Large (`lg`)
- Height: 16 (4rem)
- Padding: 32px
- Font size: large

## Noise Texture Options

The noise texture is applied using a PNG image (`/noise.png`) with customizable opacity:

- `0.1` - Very subtle texture
- `0.3` - Standard texture (default)
- `0.5` - Medium texture
- `0.7` - Heavy texture

The noise uses `mix-blend-mode: overlay` for realistic texture blending.

## Gradient Options

### Predefined Gradient Variables
- `var(--gradient-overlay)` - Standard theme gradient
- `var(--gradient-overlay-alt)` - Alternative gradient
- `var(--gradient-overlay-strong)` - Stronger gradient

### Custom Gradients
You can use any CSS color value:
- `rgba(255, 255, 255, 0.1)` - White overlay
- `rgba(0, 0, 0, 0.2)` - Black overlay
- `transparent` - Fade to transparent

## Sound Effects

Three sound types are available:

### Click (`/sounds/button-2.wav`)
- Standard button click sound
- Good for primary actions

### Tick (`/sounds/button-1.wav`)
- Subtle tick sound
- Good for secondary actions, selections

### Whoosh (`/sounds/whoosh-2.wav`)
- Dramatic whoosh sound
- Good for important actions, navigation

## Theme Integration

Components automatically integrate with the theme system:

### CSS Variables Used
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary` - Background colors
- `--text-primary`, `--text-secondary`, `--text-tertiary` - Text colors
- `--border-primary`, `--border-secondary`, `--border-tertiary` - Border colors
- `--bg-hover` - Hover background
- `--gradient-overlay*` - Gradient overlays
- `--*-shadow` - Box shadows

### Theme-Specific Noise Opacity
Each theme defines optimal noise opacity values:
- `--custom-noise-opacity` - General custom opacity
- `--textbox-noise-opacity` - Optimal for textboxes
- `--button-noise-opacity` - Optimal for buttons

## Best Practices

### Noise Texture
- Use sparingly (0.1-0.4 opacity) for subtle texture
- Higher values (0.5-0.7) for dramatic effects
- Consider theme compatibility

### Gradients
- Use theme variables for consistency
- Start with `var(--gradient-overlay)` and adjust as needed
- Always fade to `transparent` for natural blending

### Sound Effects
- Enable sounds only for important interactions
- Use `tick` for frequent actions to avoid fatigue
- Use `whoosh` for special/dramatic actions
- Always respect the `muted` prop

### Variants and Sizes
- Use `primary` for main actions
- Use `secondary` for supporting actions
- Use `tertiary` for minimal, subtle actions
- TextBox components maintain a consistent size across all uses
- Match button sizes within the same context

## ShowcasePanel

The `ShowcasePanel` component demonstrates all customization options and provides an interactive playground for testing different combinations of props.

```tsx
import { ShowcasePanel } from './components';

// Add to your app to see all examples
<ShowcasePanel />
```