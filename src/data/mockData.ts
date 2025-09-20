import { Issue, User } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'admin@cityportal.gov',
  name: 'Sarah Chen',
  role: 'admin',
  department: 'Public Works'
};

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing vehicle damage near intersection with Oak Ave. Approximately 3 feet wide and 8 inches deep.',
    category: 'pothole',
    priority: 'high',
    status: 'in_progress',
    location: {
      address: '1234 Main Street, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=1',
    reportedBy: {
      id: 'user1',
      name: 'John Martinez',
      email: 'j.martinez@email.com'
    },
    assignedTo: {
      id: 'staff1',
      name: 'Mike Thompson',
      department: 'Road Maintenance'
    },
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T14:22:00Z',
    estimatedResolution: '2024-01-18T17:00:00Z'
  },
  {
    id: '2',
    title: 'Broken streetlight - Park Avenue',
    description: 'Streetlight has been out for 3 days, creating safety concerns for pedestrians during evening hours.',
    category: 'streetlight',
    priority: 'medium',
    status: 'new',
    location: {
      address: '567 Park Avenue, Midtown',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=2',
    reportedBy: {
      id: 'user2',
      name: 'Emily Davis'
    },
    createdAt: '2024-01-14T19:45:00Z',
    updatedAt: '2024-01-14T19:45:00Z'
  },
  {
    id: '3',
    title: 'Overflowing trash bins at Central Park',
    description: 'Multiple trash receptacles overflowing, attracting pests and creating unsanitary conditions.',
    category: 'trash',
    priority: 'medium',
    status: 'assigned',
    location: {
      address: 'Central Park, Section B',
      coordinates: { lat: 40.7812, lng: -73.9665 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=3',
    reportedBy: {
      id: 'user3',
      name: 'Robert Kim'
    },
    assignedTo: {
      id: 'staff2',
      name: 'Lisa Rodriguez',
      department: 'Sanitation'
    },
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-14T09:15:00Z',
    estimatedResolution: '2024-01-16T12:00:00Z'
  },
  {
    id: '4',
    title: 'Graffiti on public building wall',
    description: 'Large graffiti tag on the side of the community center building, visible from the main road.',
    category: 'graffiti',
    priority: 'low',
    status: 'resolved',
    location: {
      address: '890 Community Drive, Westside',
      coordinates: { lat: 40.7420, lng: -74.0032 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=4',
    reportedBy: {
      id: 'user4',
      name: 'Angela Foster'
    },
    assignedTo: {
      id: 'staff3',
      name: 'David Wilson',
      department: 'Building Maintenance'
    },
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-12T10:45:00Z',
    resolvedAt: '2024-01-12T10:45:00Z'
  },
  {
    id: '5',
    title: 'Water leak at bus stop',
    description: 'Continuous water leak from underground pipe creating puddle and potential slip hazard.',
    category: 'water_leak',
    priority: 'urgent',
    status: 'new',
    location: {
      address: 'Bus Stop 15, River Road',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=5',
    reportedBy: {
      id: 'user5',
      name: 'Marcus Johnson'
    },
    createdAt: '2024-01-15T07:15:00Z',
    updatedAt: '2024-01-15T07:15:00Z'
  },
  {
    id: '6',
    title: 'Missing stop sign at intersection',
    description: 'Stop sign knocked down during recent storm, creating dangerous intersection.',
    category: 'traffic_sign',
    priority: 'urgent',
    status: 'in_progress',
    location: {
      address: 'Elm St & Pine Ave intersection',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    imageUrl: 'https://picsum.photos/800/600?random=6',
    reportedBy: {
      id: 'user6',
      name: 'Patricia Wong'
    },
    assignedTo: {
      id: 'staff4',
      name: 'James Brown',
      department: 'Traffic Management'
    },
    createdAt: '2024-01-14T06:00:00Z',
    updatedAt: '2024-01-15T13:30:00Z',
    estimatedResolution: '2024-01-15T18:00:00Z'
  }
];