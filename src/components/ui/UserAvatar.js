'use client';

import PropTypes from 'prop-types';

const UserAvatar = ({ 
  user, 
  size = 'md', 
  showName = false, 
  className = '' 
}) => {
  if (!user) {
    return (
      <div className={`avatar-placeholder ${getSizeClass(size)} ${className}`}>
        <i className="bi bi-person-fill text-muted"></i>
      </div>
    );
  }

  const sizeClass = getSizeClass(size);
  const iconClass = getRoleIcon(user.role);
  
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <div 
        className={`avatar-icon bg-${user.color} text-white rounded-circle d-flex align-items-center justify-content-center ${sizeClass}`}
        title={user.name}
      >
        {user.initials ? (
          <span className="fw-bold">{user.initials}</span>
        ) : (
          <i className={`${iconClass}`}></i>
        )}
      </div>
      {showName && (
        <div className="ms-2">
          <div className="small fw-medium">{user.name}</div>
          <div className="text-muted small">{user.role}</div>
        </div>
      )}
    </div>
  );
};

const getSizeClass = (size) => {
  const sizes = {
    sm: 'avatar-sm',
    md: 'avatar-md', 
    lg: 'avatar-lg',
    xl: 'avatar-xl'
  };
  return sizes[size] || sizes.md;
};

const getRoleIcon = (role) => {
  const roleIcons = {
    developer: 'bi bi-code-slash',
    designer: 'bi bi-palette-fill',
    manager: 'bi bi-person-badge-fill',
    qa: 'bi bi-bug-fill',
    default: 'bi bi-person-fill'
  };
  return roleIcons[role] || roleIcons.default;
};

UserAvatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    initials: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string
  }),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showName: PropTypes.bool,
  className: PropTypes.string
};

export default UserAvatar;