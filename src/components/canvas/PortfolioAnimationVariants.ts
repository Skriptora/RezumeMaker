import type { Variants } from 'framer-motion'
import type { PortfolioAnimationType } from '../../types/resume'

export interface AnimationConfig {
  id: PortfolioAnimationType
  label: string
  description: string
  iconName: string
}

export const ANIMATION_OPTIONS: AnimationConfig[] = [
  {
    id: 'slide-up',
    label: 'Slide Up',
    description: 'Smooth vertical translation from bottom with opacity fade',
    iconName: 'ArrowUp',
  },
  {
    id: 'fade-in',
    label: 'Fade In',
    description: 'Soft cinematic opacity emergence',
    iconName: 'Eye',
  },
  {
    id: 'scale-up',
    label: 'Scale Up',
    description: 'Zoom from 85% to 100% with crisp spring damping',
    iconName: 'Maximize2',
  },
  {
    id: 'stagger',
    label: 'Staggered Sequence',
    description: 'Cascading sequential reveal across cards with delay offset',
    iconName: 'Layers',
  },
  {
    id: 'flip-up',
    label: '3D Flip Up',
    description: 'Perspective 3D tilt-up rotation on entrance',
    iconName: 'RotateCw',
  },
  {
    id: 'bounce',
    label: 'Spring Bounce',
    description: 'Playful bouncy spring entrance with high responsiveness',
    iconName: 'Sparkles',
  },
]

export const getContainerVariants = (animation: PortfolioAnimationType): Variants => {
  if (animation === 'stagger') {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.05,
        },
      },
    }
  }

  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }
}

export const getItemVariants = (animation: PortfolioAnimationType): Variants => {
  switch (animation) {
    case 'slide-up':
      return {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }

    case 'fade-in':
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }

    case 'scale-up':
      return {
        hidden: { opacity: 0, scale: 0.84 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
        },
      }

    case 'stagger':
      return {
        hidden: { opacity: 0, y: 35, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }

    case 'flip-up':
      return {
        hidden: { opacity: 0, rotateX: 45, y: 30 },
        visible: {
          opacity: 1,
          rotateX: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }

    case 'bounce':
      return {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 18,
          },
        },
      }

    default:
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }
  }
}
