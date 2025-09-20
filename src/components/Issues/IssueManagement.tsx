import React, { useState, useMemo } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { Issue, FilterState } from '../../types';
import { mockIssues } from '../../data/mockData';
import { FilterSidebar } from './FilterSidebar';
import { IssueCard } from './IssueCard';
import { IssueDetailModal } from './IssueDetailModal';

export const IssueManagement: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priority: [],
    status: [],
    location: '',
    dateRange: {}
  });

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      // Search term filter
      if (searchTerm && !issue.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !issue.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !issue.location.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(issue.category)) {
        return false;
      }

      // Priority filter
      if (filters.priority.length > 0 && !filters.priority.includes(issue.priority)) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(issue.status)) {
        return false;
      }

      // Location filter
      if (filters.location && !issue.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start) {
        const issueDate = new Date(issue.createdAt);
        const startDate = new Date(filters.dateRange.start);
        if (issueDate < startDate) return false;
      }

      if (filters.dateRange.end) {
        const issueDate = new Date(issue.createdAt);
        const endDate = new Date(filters.dateRange.end);
        if (issueDate > endDate) return false;
      }

      return true;
    });
  }, [issues, searchTerm, filters]);

  const handleStatusUpdate = (issueId: string, status: Issue['status']) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, status, updatedAt: new Date().toISOString() }
          : issue
      )
    );
    
    // Update selected issue if it's the one being updated
    if (selectedIssue?.id === issueId) {
      setSelectedIssue(prev => prev ? { ...prev, status, updatedAt: new Date().toISOString() } : null);
    }
  };

  const handleAssign = (issueId: string, staffId: string, staffName: string, department: string) => {
    const updatedIssue = {
      assignedTo: { id: staffId, name: staffName, department },
      status: 'assigned' as Issue['status'],
      updatedAt: new Date().toISOString()
    };

    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, ...updatedIssue }
          : issue
      )
    );

    if (selectedIssue?.id === issueId) {
      setSelectedIssue(prev => prev ? { ...prev, ...updatedIssue } : null);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      priority: [],
      status: [],
      location: '',
      dateRange: {}
    });
    setSearchTerm('');
  };

  const getStatusCounts = () => {
    return {
      total: issues.length,
      new: issues.filter(i => i.status === 'new').length,
      assigned: issues.filter(i => i.status === 'assigned').length,
      in_progress: issues.filter(i => i.status === 'in_progress').length,
      resolved: issues.filter(i => i.status === 'resolved').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="h-full flex">
      {/* Filter Sidebar */}
      {showFilters && (
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Issue Management</h1>
              <p className="text-gray-600">Monitor and manage civic issues reported by citizens</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-colors ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
              <div className="text-sm text-blue-800">Total Issues</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.new}</div>
              <div className="text-sm text-yellow-800">New</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{statusCounts.assigned}</div>
              <div className="text-sm text-purple-800">Assigned</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{statusCounts.in_progress}</div>
              <div className="text-sm text-orange-800">In Progress</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
              <div className="text-sm text-green-800">Resolved</div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
          </div>

          {filteredIssues.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={() => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onStatusUpdate={handleStatusUpdate}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};