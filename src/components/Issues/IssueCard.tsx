import React from 'react';
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Issue } from '../../types';

interface IssueCardProps {
  issue: Issue;
  onClick: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      pothole: 'bg-orange-100 text-orange-800',
      streetlight: 'bg-yellow-100 text-yellow-800',
      trash: 'bg-green-100 text-green-800',
      graffiti: 'bg-purple-100 text-purple-800',
      water_leak: 'bg-blue-100 text-blue-800',
      traffic_sign: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCategoryLabel = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <img
            src={issue.imageUrl}
            alt="Issue"
            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {issue.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {issue.description}
            </p>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Eye className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
          {formatCategoryLabel(issue.category)}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
          {issue.priority.toUpperCase()}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
          {issue.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{issue.location.address}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Reported by {issue.reportedBy.name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(issue.createdAt)}</span>
        </div>

        {issue.assignedTo && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Assigned to {issue.assignedTo.name}</span>
          </div>
        )}

        {issue.estimatedResolution && issue.status !== 'resolved' && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Est. completion: {formatDate(issue.estimatedResolution)}</span>
          </div>
        )}
      </div>
    </div>
  );
};