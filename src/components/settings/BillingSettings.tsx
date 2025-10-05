import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard, 
  Crown, 
  CheckCircle, 
  Calendar, 
  Download,
  ExternalLink,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Settings
} from 'lucide-react'

const BillingSettings: React.FC = () => {
  const [currentPlan] = useState({
    name: 'Professional',
    price: '$49',
    period: 'month',
    features: [
      'Unlimited job postings',
      'Advanced candidate management',
      'Team collaboration tools',
      'Analytics & reporting',
      'API access',
      'Priority support'
    ]
  })

  const [billingHistory] = useState([
    { id: '1', date: '2024-01-15', amount: '$49.00', status: 'paid', invoice: 'INV-001' },
    { id: '2', date: '2023-12-15', amount: '$49.00', status: 'paid', invoice: 'INV-002' },
    { id: '3', date: '2023-11-15', amount: '$49.00', status: 'paid', invoice: 'INV-003' }
  ])

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: 'month',
      description: 'Perfect for small teams',
      features: ['5 job postings', 'Basic analytics', 'Email support'],
      current: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: 'month',
      description: 'Most popular for growing teams',
      features: ['Unlimited job postings', 'Advanced analytics', 'Team collaboration', 'Priority support'],
      current: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For large organizations',
      features: ['Everything in Professional', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
      current: false
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Billing & Subscription</h2>
          <p className="text-muted-foreground">Manage your subscription and payment methods</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1">
            <Crown className="h-3 w-3" />
            Pro Plan
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{currentPlan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{currentPlan.price}</span>
                  <span className="text-muted-foreground">/{currentPlan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">Next billing: February 15, 2024</p>
              </div>
              
              <div className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Manage Plan
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Visa ending in 4242</h3>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Default</Badge>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Available Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 border rounded-lg ${
                  plan.current 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      {plan.current && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Invoice {invoice.invoice}</h3>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{invoice.amount}</span>
                  <Badge variant="secondary">{invoice.status}</Badge>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Job Postings</div>
              <div className="text-xs text-emerald-600">Unlimited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Candidates</div>
              <div className="text-xs text-emerald-600">Unlimited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
              <div className="text-xs text-emerald-600">Unlimited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
              <div className="text-xs text-orange-600">15GB / 17GB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Billing Portal
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="destructive">
          Cancel Subscription
        </Button>
      </div>
    </div>
  )
}

export default BillingSettings

