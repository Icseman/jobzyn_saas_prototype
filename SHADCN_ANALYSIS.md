# Shadcn/UI Integration Improvements

## Missing Components to Add

### 1. Checkbox Component
```bash
npx shadcn@latest add checkbox
```

### 2. Select Component  
```bash
npx shadcn@latest add select
```

### 3. Separator Component
```bash
npx shadcn@latest add separator
```

### 4. Card Component
```bash
npx shadcn@latest add card
```

## Current Issues to Fix

### 1. Native HTML Elements
- Replace native `<input type="checkbox">` with shadcn Checkbox
- Replace native `<select>` with shadcn Select
- Replace custom separator divs with shadcn Separator

### 2. Missing Dependencies
Add to package.json:
```json
{
  "@radix-ui/react-checkbox": "^1.1.2",
  "@radix-ui/react-select": "^2.1.2", 
  "@radix-ui/react-separator": "^1.1.0"
}
```

### 3. Theme Integration
- The current theme system works well
- CSS variables are properly configured
- Dark/light mode toggle is functional

## Implementation Priority

1. **High Priority**: Add Checkbox and Select components
2. **Medium Priority**: Add Separator component  
3. **Low Priority**: Add Card component for enhanced UI

## Benefits of Full Integration

- Consistent design system
- Better accessibility
- Improved theming
- Easier maintenance
- Better TypeScript support
