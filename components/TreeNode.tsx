import React, { useState } from 'react';
import { FaUser, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { User } from '@/lib/models/user';

interface TreeNodeProps {
  user: User;
  level: number;
  onLoadChildren: (userId: string) => Promise<User[]>;
}

export function TreeNode({ user, level, onLoadChildren }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<User[]>([]);

  const handleToggle = async () => {
    if (!isExpanded && children.length === 0) {
      const loadedChildren = await onLoadChildren(user.id);
      setChildren(loadedChildren);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center mb-2">
        <button
          onClick={handleToggle}
          className="mr-2 focus:outline-none"
          aria-label={isExpanded ? "折りたたむ" : "展開する"}
        >
          {user.directReferrals.length > 0 && (
            isExpanded ? <FaChevronDown /> : <FaChevronRight />
          )}
        </button>
        <div className="flex items-center bg-white p-2 rounded-lg shadow">
          <FaUser className="mr-2 text-blue-500" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">階級: {user.level}</p>
            <p className="text-sm text-gray-500">投資額: ${user.investment}</p>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="ml-6 border-l-2 border-gray-200 pl-4">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              user={child}
              level={level + 1}
              onLoadChildren={onLoadChildren}
            />
          ))}
        </div>
      )}
    </div>
  );
}

