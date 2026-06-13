import { colors } from "./colors";

export const semanticColors = {
  app: {
    background: colors.surface.app,
    foreground: colors.text.primary,
    border: colors.surface.border,
  },

  shell: {
    railBackground: colors.navy[950],
    railBorder: colors.navy[800],
    railIcon: colors.navy[400],
    railIconActive: colors.brand[400],
    railItemActive: colors.navy[800],
    railItemHover: colors.navy[900],
    megaMenuBackground: colors.surface.page,
    megaMenuBorder: colors.surface.border,
    megaMenuHover: colors.surface.muted,
    topbarBackground: colors.surface.page,
    topbarBorder: colors.surface.border,
  },

  card: {
    background: colors.surface.card,
    border: colors.surface.border,
    title: colors.text.primary,
    description: colors.text.secondary,
    muted: colors.surface.muted,
  },

  action: {
    primary: colors.brand[600],
    primaryHover: colors.brand[700],
    primaryText: colors.surface.page,
    secondary: colors.navy[100],
    secondaryHover: colors.navy[200],
    secondaryText: colors.text.primary,
    ghost: "transparent",
    ghostHover: colors.navy[100],
    destructive: colors.danger[600],
    destructiveHover: colors.danger[700],
    destructiveText: colors.surface.page,
  },

  status: {
    open: {
      bg: colors.brand[50],
      text: colors.brand[700],
      border: colors.brand[200],
      dot: colors.brand[500],
    },
    acknowledged: {
      bg: colors.purple[50],
      text: colors.purple[700],
      border: colors.purple[200],
      dot: colors.purple[500],
    },
    under_review: {
      bg: colors.warning[50],
      text: colors.warning[700],
      border: colors.warning[200],
      dot: colors.warning[500],
    },
    resolved: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
      dot: colors.success[500],
    },
    implemented: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
      dot: colors.success[500],
    },
    dismissed: {
      bg: colors.navy[100],
      text: colors.navy[600],
      border: colors.navy[300],
      dot: colors.navy[400],
    },
  },

  severity: {
    low: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
    },
    medium: {
      bg: colors.warning[50],
      text: colors.warning[700],
      border: colors.warning[200],
    },
    high: {
      bg: colors.orange[50],
      text: colors.orange[700],
      border: colors.orange[200],
    },
    critical: {
      bg: colors.danger[50],
      text: colors.danger[700],
      border: colors.danger[200],
    },
  },

  risk: {
    low: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
    },
    medium: {
      bg: colors.warning[50],
      text: colors.warning[700],
      border: colors.warning[200],
    },
    high: {
      bg: colors.orange[50],
      text: colors.orange[700],
      border: colors.orange[200],
    },
    critical: {
      bg: colors.danger[50],
      text: colors.danger[700],
      border: colors.danger[200],
    },
  },

  intelligence: {
    forecast: colors.brand[600],
    earlyWarning: colors.warning[600],
    prevention: colors.success[600],
    monitoring: colors.purple[600],
    graph: colors.intelligence[600],
    financial: colors.success[700],
    assistant: colors.purple[600],
    criminology: colors.intelligence[700],
  },

  qualityLevel: {
    good: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
    },
    acceptable: {
      bg: colors.brand[50],
      text: colors.brand[700],
      border: colors.brand[200],
    },
    weak: {
      bg: colors.warning[50],
      text: colors.warning[700],
      border: colors.warning[200],
    },
    insufficient_data: {
      bg: colors.navy[100],
      text: colors.navy[600],
      border: colors.navy[300],
    },
  },

  freshness: {
    fresh: {
      bg: colors.success[50],
      text: colors.success[700],
      border: colors.success[200],
    },
    stale: {
      bg: colors.warning[50],
      text: colors.warning[700],
      border: colors.warning[200],
    },
    missing: {
      bg: colors.danger[50],
      text: colors.danger[700],
      border: colors.danger[200],
    },
    unknown: {
      bg: colors.navy[100],
      text: colors.navy[600],
      border: colors.navy[300],
    },
  },
} as const;
