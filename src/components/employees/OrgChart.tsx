import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Plus, 
  Settings,
  ChevronDown,
  User,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid3X3
} from 'lucide-react';

interface CanvasState {
  zoom: number;
  panX: number;
  panY: number;
  isDragging: boolean;
  lastMouseX: number;
  lastMouseY: number;
  backgroundColor: string;
  showGrid: boolean;
}

const ZoomableCanvas: React.FC<{ 
  children: React.ReactNode
  canvasState: CanvasState
  onCanvasStateChange: (state: Partial<CanvasState>) => void
}> = ({ children, canvasState, onCanvasStateChange }) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Add native wheel event listener for better touchpad support
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const rect = canvas.getBoundingClientRect()
      if (!rect) return
      
      // Get mouse position relative to canvas
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculate zoom factor - use smaller increments for smoother touchpad experience
      const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05
      const newZoom = Math.max(0.1, Math.min(3, canvasState.zoom * zoomFactor))
      
      // Only update if zoom actually changed
      if (Math.abs(newZoom - canvasState.zoom) > 0.001) {
        // Calculate the point to zoom towards (mouse position)
        const zoomPointX = (mouseX - canvasState.panX) / canvasState.zoom
        const zoomPointY = (mouseY - canvasState.panY) / canvasState.zoom
        
        // Adjust pan to keep the zoom point under the mouse
        const newPanX = mouseX - zoomPointX * newZoom
        const newPanY = mouseY - zoomPointY * newZoom
        
        onCanvasStateChange({ 
          zoom: newZoom,
          panX: newPanX,
          panY: newPanY
        })
      }
    }

    // Add event listener with passive: false to allow preventDefault
    canvas.addEventListener('wheel', handleNativeWheel, { passive: false })
    
    return () => {
      canvas.removeEventListener('wheel', handleNativeWheel)
    }
  }, [canvasState.zoom, canvasState.panX, canvasState.panY, onCanvasStateChange])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle left mouse button for dragging
    if (e.button === 0) {
      e.preventDefault()
      e.stopPropagation()
      onCanvasStateChange({ 
        isDragging: true, 
        lastMouseX: e.clientX, 
        lastMouseY: e.clientY 
      })
    }
  }, [onCanvasStateChange])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (canvasState.isDragging) {
      e.preventDefault()
      e.stopPropagation()
      
      const deltaX = e.clientX - canvasState.lastMouseX
      const deltaY = e.clientY - canvasState.lastMouseY
      
      onCanvasStateChange({
        panX: canvasState.panX + deltaX,
        panY: canvasState.panY + deltaY,
        lastMouseX: e.clientX,
        lastMouseY: e.clientY
      })
    }
  }, [canvasState, onCanvasStateChange])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (canvasState.isDragging) {
      e.preventDefault()
      e.stopPropagation()
      onCanvasStateChange({ isDragging: false })
    }
  }, [canvasState.isDragging, onCanvasStateChange])

  const handleMouseLeave = useCallback(() => {
    if (canvasState.isDragging) {
      onCanvasStateChange({ isDragging: false })
    }
  }, [canvasState.isDragging, onCanvasStateChange])

  const resetView = useCallback(() => {
    onCanvasStateChange({ zoom: 1, panX: 0, panY: 0 })
  }, [onCanvasStateChange])

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(3, canvasState.zoom + 0.1)
    onCanvasStateChange({ zoom: newZoom })
  }, [canvasState.zoom, onCanvasStateChange])

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(0.1, canvasState.zoom - 0.1)
    onCanvasStateChange({ zoom: newZoom })
  }, [canvasState.zoom, onCanvasStateChange])

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ 
        cursor: canvasState.isDragging ? 'grabbing' : 'grab',
        backgroundColor: canvasState.backgroundColor
      }}
    >
      {/* Grid Background */}
      {canvasState.showGrid && (
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: `${20 * canvasState.zoom}px ${20 * canvasState.zoom}px`,
            backgroundPosition: `${canvasState.panX % (20 * canvasState.zoom)}px ${canvasState.panY % (20 * canvasState.zoom)}px`,
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%',
            transform: `translate(${canvasState.panX}px, ${canvasState.panY}px)`
          }}
        />
      )}
      
      {/* Content */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${canvasState.panX}px, ${canvasState.panY}px) scale(${canvasState.zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {children}
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border">
        <Button
          variant={canvasState.showGrid ? "default" : "outline"}
          size="sm"
          onClick={() => onCanvasStateChange({ showGrid: !canvasState.showGrid })}
          title={canvasState.showGrid ? "Hide Grid" : "Show Grid"}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-border"></div>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          disabled={canvasState.zoom <= 0.1}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="px-2 py-1 text-sm bg-muted rounded border border-border min-w-[60px] text-center text-foreground">
          {Math.round(canvasState.zoom * 100)}%
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          disabled={canvasState.zoom >= 3}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const OrgChart: React.FC = () => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    backgroundColor: '#f8fafc',
    showGrid: true
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Organization Chart</h2>
          <p className="text-muted-foreground">Visualize your organizational structure</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Position
          </Button>
        </div>
      </div>

      {/* Zoomable Org Chart */}
      <Card className="h-[600px]">
        <CardContent className="p-0 h-full">
          <ZoomableCanvas 
            canvasState={canvasState} 
            onCanvasStateChange={(state) => setCanvasState(prev => ({ ...prev, ...state }))}
          >
            <div className="w-[1200px] h-[800px] p-8 relative">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {/* CEO to Department Heads */}
                <line x1="600" y1="120" x2="300" y2="280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="8,4" />
                <line x1="600" y1="120" x2="600" y2="280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="8,4" />
                <line x1="600" y1="120" x2="900" y2="280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="8,4" />
                
                {/* Department Heads to Teams */}
                {/* CTO to Engineering Team */}
                <line x1="300" y1="380" x2="200" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="300" y1="380" x2="300" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="300" y1="380" x2="400" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                
                {/* CFO to Finance Team */}
                <line x1="600" y1="380" x2="500" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="600" y1="380" x2="600" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="600" y1="380" x2="700" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                
                {/* CHRO to HR Team */}
                <line x1="900" y1="380" x2="800" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="900" y1="380" x2="900" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
                <line x1="900" y1="380" x2="1000" y2="480" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3" />
              </svg>

              {/* CEO Level */}
              <div className="flex justify-center mb-8 relative" style={{ zIndex: 2 }}>
                <Card className="w-48 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                      <img 
                        src="/assets/team/Simo Zizi.jpeg" 
                        alt="Simo Zizi"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground">Simo Zizi</h3>
                    <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                    <Badge variant="secondary" className="mt-2">Executive</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Department Heads */}
              <div className="flex justify-center gap-16 mb-8 relative" style={{ zIndex: 2 }}>
                {[
                  { role: 'CTO', name: 'Abdelbassite Badou', image: '/src/Assets/team/Abdelbassite Badou.jpeg' },
                  { role: 'HR Business Partner', name: 'Salma Bennani', image: '/src/Assets/team/Salma Bennani.jpeg' },
                  { role: 'Partnerships Manager', name: 'Souhaila Mouchtanim', image: '/src/Assets/team/Souhaila Mouchtanim  .jpeg' }
                ].map((dept, index) => (
                  <Card key={index} className="w-40 hover:shadow-md transition-shadow">
                    <CardContent className="p-3 text-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        <img 
                          src={dept.image} 
                          alt={dept.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h4 className="font-medium text-foreground text-sm">{dept.role}</h4>
                      <p className="text-xs text-muted-foreground">{dept.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Teams */}
              <div className="grid grid-cols-3 gap-8 relative" style={{ zIndex: 2 }}>
                {/* Engineering Team */}
                <div className="space-y-3">
                  <h4 className="text-center font-semibold text-foreground mb-4">Engineering Team</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'Karim Baggari', role: 'Full Stack Engineer', image: '/src/Assets/team/Karim Baggari .jpeg' },
                      { name: 'Abdellah Maarifa', role: 'Full Stack Engineer', image: '/src/Assets/team/Abdellah Maarifa  .jpeg' },
                      { name: 'Aya Birouk', role: 'AI & ML Engineer', image: '/src/Assets/team/Aya Birouk.jpeg' },
                      { name: 'Nassim Jadid', role: 'AI & ML Engineer', image: '/src/Assets/team/Nassim Jadid.jpeg' }
                    ].map((member, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-foreground font-medium">{member.name}</span>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Marketing Team */}
                <div className="space-y-3">
                  <h4 className="text-center font-semibold text-foreground mb-4">Marketing Team</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'Oussama El Hajjami', role: 'Marketing Manager', image: '/src/Assets/team/Oussama El Hajjami .jpeg' },
                      { name: 'Nada Zaakoun', role: 'Marketing Operations', image: '/src/Assets/team/Nada Zaakoun.jpeg' },
                      { name: 'Soukeina Er-rafay', role: 'Marketing Operations', image: '/src/Assets/team/Soukeina Er-rafay.jpeg' }
                    ].map((member, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-foreground font-medium">{member.name}</span>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Legal Team */}
                <div className="space-y-3">
                  <h4 className="text-center font-semibold text-foreground mb-4">Legal Team</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'El Hassan El Asri', role: 'Jurist', image: '/src/Assets/team/El Hassan El Asri.jpeg' }
                    ].map((member, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-foreground font-medium">{member.name}</span>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ZoomableCanvas>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgChart;
