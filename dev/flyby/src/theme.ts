import {
  createSystem,
  defaultConfig,
  defineGlobalStyles,
  defineRecipe,
  defineTokens
} from '@chakra-ui/react';

/** Hex values shared with Chakra tokens (e.g. third-party components that need raw colors). */
export const brandColors = {
  black: '#12151A',
  white: '#FCFDFF',
  light: '#DEE2E7',
  100: '#D9CFFF',
  200: '#AD9BF6',
  300: '#7156D9',
  400: '#3F20BA',
  midnight: '#1B2240',
  error: '#9C2323'
};

const system = createSystem(defaultConfig, {
  globalCss: defineGlobalStyles({
    img: {
      borderRadius: 'image'
    }
  }),
  theme: {
    recipes: {
      button: defineRecipe({
        base: {
          fontSize: 'md',
          fontWeight: 600
        },
        variants: {
          size: {
            '2xs': { textStyle: 'none' },
            xs: { textStyle: 'none' },
            sm: { textStyle: 'none' },
            md: { textStyle: 'none' },
            lg: { textStyle: 'none' },
            xl: { textStyle: 'none' },
            '2xl': { textStyle: 'none' }
          }
        }
      })
    },
    tokens: {
      radii: defineTokens.radii({
        image: { value: '12px' }
      }),
      fonts: {
        heading: { value: "'Source Sans 3', sans-serif" },
        body: { value: "'Source Sans 3', sans-serif" }
      },
      colors: {
        brand: {
          black: { value: brandColors.black },
          white: { value: brandColors.white },
          light: { value: brandColors.light },
          100: { value: brandColors[100] },
          200: { value: brandColors[200] },
          300: { value: brandColors[300] },
          400: { value: brandColors[400] },
          midnight: { value: brandColors.midnight },
          error: { value: brandColors.error }
        }
      }
    }
  }
});

export default system;
