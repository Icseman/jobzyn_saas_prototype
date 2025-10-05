import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  SaveIcon, 
  EyeIcon, 
  XIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react'

interface JobCreationFooterProps {
  hasUnsavedChanges: boolean
  currentStep: number
  totalSteps: number
  onSaveDraft: () => void
  onPreview: () => void
  onCancel: () => void
  onPrevious?: () => void
  onNext?: () => void
  isNextDisabled?: boolean
  isPreviousDisabled?: boolean
}

export const JobCreationFooter: React.FC<JobCreationFooterProps> = ({
  hasUnsavedChanges,
  currentStep,
  totalSteps,
  onSaveDraft,
  onPreview,
  onCancel,
  onPrevious,
  onNext,
  isNextDisabled = false,
  isPreviousDisabled = false
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Unsaved Changes Indicator */}
          <div className="flex items-center gap-3">
            {hasUnsavedChanges ? (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircleIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Unsaved changes</span>
                <Badge variant="outline" className="text-orange-600 border-orange-600 dark:text-orange-400 dark:border-orange-400">
                  Draft
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="text-sm font-medium">All changes saved</span>
              </div>
            )}
          </div>

          {/* Center Section - Step Navigation */}
          <div className="flex items-center gap-2">
            {onPrevious && (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isPreviousDisabled}
                className="flex items-center gap-2"
              >
                <span>Previous</span>
              </Button>
            )}
            
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
            </div>

            {onNext && (
              <Button
                onClick={onNext}
                disabled={isNextDisabled}
                className="flex items-center gap-2"
              >
                <span>Next</span>
              </Button>
            )}
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              className="flex items-center gap-2"
            >
              <SaveIcon className="h-4 w-4" />
              Save Draft
            </Button>
            
            <Button
              variant="outline"
              onClick={onPreview}
              className="flex items-center gap-2"
            >
              <EyeIcon className="h-4 w-4" />
              Preview
            </Button>
            
            <Button
              variant="destructive"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <XIcon className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


