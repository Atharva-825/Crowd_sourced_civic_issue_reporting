export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'department_head';
  department: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'pothole' | 'streetlight' | 'trash' | 'graffiti' | 'water_leak' | 'traffic_sign' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  imageUrl: string;
  reportedBy: {
    id: string;
    name: string;
    email?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    department: string;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  estimatedResolution?: string;
}

export interface FilterState {
  category: string[];
  priority: string[];
  status: string[];
  location: string;
  dateRange: {
    start?: string;
    end?: string;
  };
}