'use client'

import { Container, Card, CardContent, CardHeader, CardTitle, Badge, Button, Avatar } from '@/components/ui'
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  description: string
  postedAt: string
  initials: string
}

export interface LatestJobsProps {
  jobs?: Job[]
  title?: string
  subtitle?: string
  onViewAll?: () => void
}

  const DEFAULT_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Thailand',
    location: 'Bangkok, CBD',
    salary: '฿100,000 - ฿150,000',
    type: 'Full-time',
    description: 'Seeking experienced software engineer with expertise in cloud technologies',
    postedAt: '2 days ago',
    initials: 'TC',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Digital Solutions Co.',
    location: 'Bangkok, Silom',
    salary: '฿70,000 - ฿100,000',
    type: 'Full-time',
    description: 'Lead marketing campaigns for regional expansion',
    postedAt: '3 days ago',
    initials: 'DS',
  },
  {
    id: '3',
    title: 'English Teacher',
    company: 'Bangkok International School',
    location: 'Bangkok, Nana',
    salary: '฿50,000 - ฿80,000',
    type: 'Full-time',
    description: 'Teach English to secondary students in a reputable institution',
    postedAt: '1 day ago',
    initials: 'BI',
  },
  {
    id: '4',
    title: 'Freelance Web Developer',
    company: 'Global Tech Agency',
    location: 'Remote',
    salary: '฿500 - ฿2,000/day',
    type: 'Freelance',
    description: 'Develop responsive websites for international clients',
    postedAt: '5 days ago',
    initials: 'GA',
  },
  {
    id: '5',
    title: 'Business Development Executive',
    company: 'Myanmar Import/Export Ltd.',
    location: 'Bangkok, Ratchada',
    salary: '฿60,000 - ฿90,000',
    type: 'Full-time',
    description: 'Expand business relationships with Southeast Asian partners',
    postedAt: '1 day ago',
    initials: 'MI',
  },
  {
    id: '6',
    title: 'Content Writer',
    company: 'Digital Media House',
    location: 'Bangkok, Online',
    salary: '฿30,000 - ฿50,000',
    type: 'Part-time',
    description: 'Create engaging content for multiple platforms',
    postedAt: '4 days ago',
    initials: 'DM',
  },
]

export function LatestJobs({
  jobs = DEFAULT_JOBS,
  title = 'Latest Job Opportunities',
  subtitle = 'Find your next career opportunity in Thailand',
  onViewAll = () => {},
}: LatestJobsProps) {
  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'Full-time':
        return 'success'
      case 'Part-time':
        return 'warning'
      case 'Contract':
        return 'danger'
      case 'Freelance':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-secondary/3">
      <Container>
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="mt-6 md:mt-0 w-fit"
          >
            View All Jobs
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} hover interactive className="border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4 justify-between">
                  <Avatar alt={job.company} fallback={job.initials} size="lg" />
                  <Badge variant={getTypeColor(job.type) as any}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Job Title and Company */}
                <div>
                  <CardTitle className="text-lg">
                    {job.title}
                  </CardTitle>
                  <p className="text-sm text-secondary font-medium mt-1">
                    {job.company}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="space-y-2">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    {job.location}
                  </div>

                  {/* Salary */}
                  {job.salary && (
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <DollarSign className="h-4 w-4 flex-shrink-0" />
                      {job.salary}
                    </div>
                  )}

                  {/* Posted At */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    Posted {job.postedAt}
                  </div>
                </div>

                {/* Apply Button */}
                <Button variant="secondary" size="sm" className="w-full mt-4">
                  View Details & Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

