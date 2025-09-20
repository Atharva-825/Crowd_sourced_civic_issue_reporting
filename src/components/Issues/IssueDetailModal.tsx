import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Edit3,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Issue } from '../../types';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
  onStatusUpdate: (issueId: string, status: Issue['status']) => void;
  onAssign: (issueId: string, staffId: string, staffName: string, department: string) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ 
  issue, 
  onClose, 
  onStatusUpdate, 
  onAssign 
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const formatCategoryLabel = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const handleAssign = () => {
    // Mock assignment - in real app, this would show staff selection
    onAssign(issue.id, 'staff1', 'Mike Thompson', 'Road Maintenance');
    setShowAssignModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{issue.title}</h2>
            <p className="text-sm text-gray-500">Issue #{issue.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {/* Image */}
            <div className="mb-6">
              <img
                src={issue.imageUrl}
                alt="Issue"
                className="w-full max-w-2xl h-64 object-cover rounded-lg border border-gray-200"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(issue.category)}`}>
                {formatCategoryLabel(issue.category)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(issue.priority)}`}>
                {issue.priority.toUpperCase()} PRIORITY
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                {issue.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{issue.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{issue.location.address}</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      View on Map
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Reported</p>
                    <p className="text-gray-600">{formatDate(issue.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Reported By</p>
                    <p className="text-gray-600">{issue.reportedBy.name}</p>
                    {issue.reportedBy.email && (
                      <p className="text-gray-500 text-sm">{issue.reportedBy.email}</p>
                    )}
                  </div>
                </div>

                {issue.assignedTo && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Assigned To</p>
                      <p className="text-gray-600">{issue.assignedTo.name}</p>
                      <p className="text-gray-500 text-sm">{issue.assignedTo.department}</p>
                    </div>
                  </div>
                )}

                {issue.estimatedResolution && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Est. Resolution</p>
                      <p className="text-gray-600">{formatDate(issue.estimatedResolution)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Comments & Updates</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">SC</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700">Issue has been assigned to road maintenance team. Expected resolution within 3 business days.</p>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or update..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              {/* Status Update */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">Update Status</span>
                  <Edit3 className="w-4 h-4" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          onStatusUpdate(issue.id, status.value as Issue['status']);
                          setShowStatusDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Assign */}
              {!issue.assignedTo && (
                <button
                  onClick={handleAssign}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">Assign Staff</span>
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* Priority Actions */}
              {issue.priority === 'urgent' && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Mark Emergency</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};