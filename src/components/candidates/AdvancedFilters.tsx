import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  Filter, 
  X, 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Star, 
  GraduationCap,
  Shield,
  Home,
  Save,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FilterOptions {
  skills: string[];
  locations: string[];
  experienceLevels: string[];
  availability: string[];
  workAuthorization: string[];
  remotePreference: string[];
  tags: string[];
}

interface SavedFilter {
  id: string;
  name: string;
  description: string;
  filters: any;
  createdBy: string;
  createdAt: string;
  isShared: boolean;
}

interface AdvancedFiltersProps {
  filterOptions: FilterOptions;
  savedFilters: SavedFilter[];
  activeFilters: any;
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filterOptions,
  savedFilters,
  activeFilters,
  onFiltersChange,
  onClose
}) => {
  const [localFilters, setLocalFilters] = useState(activeFilters);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['skills', 'location']));
  const [newFilterName, setNewFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const addArrayFilter = (key: string, value: string) => {
    const currentValues = localFilters[key] || [];
    if (!currentValues.includes(value)) {
      updateFilter(key, [...currentValues, value]);
    }
  };

  const removeArrayFilter = (key: string, value: string) => {
    const currentValues = localFilters[key] || [];
    updateFilter(key, currentValues.filter((v: string) => v !== value));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearAllFilters = () => {
    setLocalFilters({});
  };

  const saveCurrentFilter = () => {
    if (newFilterName.trim()) {
      // In a real app, this would save to the backend
      console.log('Saving filter:', newFilterName, localFilters);
      setShowSaveDialog(false);
      setNewFilterName('');
    }
  };

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    setLocalFilters(savedFilter.filters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count + (value ? 1 : 0);
    }, 0);
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    sectionKey: string;
    children: React.ReactNode;
  }> = ({ title, icon, sectionKey, children }) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer" 
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {icon}
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-0">
            {children}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="w-80 h-full bg-white border-l border-orange-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {getActiveFilterCount()} filters active
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Saved Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedFilters.map((filter) => (
                <div key={filter.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{filter.name}</p>
                    <p className="text-xs text-muted-foreground">{filter.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => loadSavedFilter(filter)}
                  >
                    Load
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Current Filter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Skills Filter */}
        <FilterSection
          title="Skills"
          icon={<Briefcase className="h-4 w-4 text-blue-500" />}
          sectionKey="skills"
        >
          <div className="space-y-2">
            <Input
              placeholder="Search skills..."
              className="text-sm"
            />
            <div className="max-h-40 overflow-auto space-y-1">
              {filterOptions.skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={localFilters.skills?.includes(skill) || false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addArrayFilter('skills', skill);
                      } else {
                        removeArrayFilter('skills', skill);
                      }
                    }}
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
            {localFilters.skills?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {localFilters.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => removeArrayFilter('skills', skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </FilterSection>

        {/* Location Filter */}
        <FilterSection
          title="Location"
          icon={<MapPin className="h-4 w-4 text-green-500" />}
          sectionKey="location"
        >
          <div className="space-y-2">
            <div className="max-h-40 overflow-auto space-y-1">
              {filterOptions.locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={localFilters.location?.includes(location) || false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addArrayFilter('location', location);
                      } else {
                        removeArrayFilter('location', location);
                      }
                    }}
                  />
                  <Label htmlFor={`location-${location}`} className="text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
            {localFilters.location?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {localFilters.location.map((location: string) => (
                  <Badge key={location} variant="secondary" className="text-xs">
                    {location}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => removeArrayFilter('location', location)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </FilterSection>

        {/* Experience Filter */}
        <FilterSection
          title="Experience"
          icon={<Star className="h-4 w-4 text-yellow-500" />}
          sectionKey="experience"
        >
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Years of Experience</Label>
              <div className="mt-2">
                <Slider
                  value={[localFilters.experienceMin || 0]}
                  onValueChange={(value) => updateFilter('experienceMin', value[0])}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 years</span>
                  <span>{localFilters.experienceMin || 0} years</span>
                  <span>20+ years</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Experience Level</Label>
              <div className="mt-2 space-y-1">
                {filterOptions.experienceLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`exp-${level}`}
                      checked={localFilters.experienceLevel?.includes(level) || false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addArrayFilter('experienceLevel', level);
                        } else {
                          removeArrayFilter('experienceLevel', level);
                        }
                      }}
                    />
                    <Label htmlFor={`exp-${level}`} className="text-sm">
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Availability Filter */}
        <FilterSection
          title="Availability"
          icon={<Clock className="h-4 w-4 text-purple-500" />}
          sectionKey="availability"
        >
          <div className="space-y-1">
            {filterOptions.availability.map((availability) => (
              <div key={availability} className="flex items-center space-x-2">
                <Checkbox
                  id={`avail-${availability}`}
                  checked={localFilters.availability?.includes(availability) || false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addArrayFilter('availability', availability);
                    } else {
                      removeArrayFilter('availability', availability);
                    }
                  }}
                />
                <Label htmlFor={`avail-${availability}`} className="text-sm">
                  {availability.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Work Authorization Filter */}
        <FilterSection
          title="Work Authorization"
          icon={<Shield className="h-4 w-4 text-red-500" />}
          sectionKey="workAuth"
        >
          <div className="space-y-1">
            {filterOptions.workAuthorization.map((auth) => (
              <div key={auth} className="flex items-center space-x-2">
                <Checkbox
                  id={`auth-${auth}`}
                  checked={localFilters.workAuthorization?.includes(auth) || false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addArrayFilter('workAuthorization', auth);
                    } else {
                      removeArrayFilter('workAuthorization', auth);
                    }
                  }}
                />
                <Label htmlFor={`auth-${auth}`} className="text-sm">
                  {auth}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Remote Preference Filter */}
        <FilterSection
          title="Remote Preference"
          icon={<Home className="h-4 w-4 text-indigo-500" />}
          sectionKey="remotePref"
        >
          <div className="space-y-1">
            {filterOptions.remotePreference.map((pref) => (
              <div key={pref} className="flex items-center space-x-2">
                <Checkbox
                  id={`pref-${pref}`}
                  checked={localFilters.remotePreference?.includes(pref) || false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addArrayFilter('remotePreference', pref);
                    } else {
                      removeArrayFilter('remotePreference', pref);
                    }
                  }}
                />
                <Label htmlFor={`pref-${pref}`} className="text-sm">
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Tags Filter */}
        <FilterSection
          title="Tags"
          icon={<Star className="h-4 w-4 text-pink-500" />}
          sectionKey="tags"
        >
          <div className="space-y-2">
            <Input
              placeholder="Search tags..."
              className="text-sm"
            />
            <div className="max-h-40 overflow-auto space-y-1">
              {filterOptions.tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={localFilters.tags?.includes(tag) || false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addArrayFilter('tags', tag);
                      } else {
                        removeArrayFilter('tags', tag);
                      }
                    }}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
            {localFilters.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {localFilters.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => removeArrayFilter('tags', tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </FilterSection>

        {/* Salary Range Filter */}
        <FilterSection
          title="Salary Range"
          icon={<Briefcase className="h-4 w-4 text-green-500" />}
          sectionKey="salary"
        >
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Minimum Salary</Label>
              <Select
                value={localFilters.minSalary || ''}
                onValueChange={(value) => updateFilter('minSalary', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select minimum salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="75000">$75,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="125000">$125,000</SelectItem>
                  <SelectItem value="150000">$150,000</SelectItem>
                  <SelectItem value="200000">$200,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Maximum Salary</Label>
              <Select
                value={localFilters.maxSalary || ''}
                onValueChange={(value) => updateFilter('maxSalary', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select maximum salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="75000">$75,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="125000">$125,000</SelectItem>
                  <SelectItem value="150000">$150,000</SelectItem>
                  <SelectItem value="200000">$200,000</SelectItem>
                  <SelectItem value="250000">$250,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="text-sm">Save Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="filterName">Filter Name</Label>
                <Input
                  id="filterName"
                  value={newFilterName}
                  onChange={(e) => setNewFilterName(e.target.value)}
                  placeholder="Enter filter name..."
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={saveCurrentFilter}
                  className="flex-1"
                  disabled={!newFilterName.trim()}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
