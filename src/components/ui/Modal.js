'use client';

export default function Modal({ 
  show, 
  onHide, 
  title, 
  children, 
  size = 'lg',
  showFooter = true,
  onSave,
  onCancel,
  saveText = 'Guardar',
  cancelText = 'Cancelar',
  saveVariant = 'primary'
}) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleBackdropClick}
    >
      <div className={`modal-dialog modal-${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            {children}
          </div>
          
          {showFooter && (
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onCancel || onHide}
              >
                {cancelText}
              </button>
              {onSave && (
                <button 
                  type="button" 
                  className={`btn btn-${saveVariant}`}
                  onClick={onSave}
                >
                  {saveText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}