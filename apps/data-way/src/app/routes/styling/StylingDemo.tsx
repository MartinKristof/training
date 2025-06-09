import styled from 'styled-components';
import styles from './StylingDemo.module.scss';
import './StylingDemo.scss';

// Styled Components example
const StyledButton = styled.button`
  background: linear-gradient(45deg, #2196f3, #21cbf3);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &.secondary {
    background: linear-gradient(45deg, #ff4081, #ff9100);
  }
`;

// CSS Modules example (using SCSS)
export const StylingDemo = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CSS-in-JS Examples</h2>

      {/* Styled Components */}
      <section className={styles.section}>
        <h3>Styled Components</h3>
        <div className={styles.buttonGroup}>
          <StyledButton>Primary Button</StyledButton>
          <StyledButton className="secondary">Secondary Button</StyledButton>
        </div>
      </section>

      {/* CSS Modules */}
      <section className={styles.section}>
        <h3>CSS Modules (SCSS)</h3>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Card Title</div>
          <div className={styles.cardBody}>This card uses CSS Modules with SCSS</div>
        </div>
      </section>

      {/* Global SCSS */}
      <section className="global-section">
        <h3>Global SCSS</h3>
        <div className="global-card">
          <div className="global-card-header">Global Styles</div>
          <div className="global-card-body">This uses global SCSS styles</div>
        </div>
      </section>

      {/* Styled JSX */}
      <section className={styles.section}>
        <h3>Styled JSX</h3>
        <div className="jsx-card">
          <style jsx>{`
            .jsx-card {
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin: 16px 0;
            }
            .jsx-card:hover {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              transform: translateY(-2px);
              transition: all 0.2s ease;
            }
            .jsx-title {
              color: #2196f3;
              font-size: 1.2em;
              margin-bottom: 12px;
            }
            .jsx-content {
              color: #666;
            }
          `}</style>
          <div className="jsx-title">Styled JSX Card</div>
          <div className="jsx-content">This card uses Styled JSX for scoped styles</div>
        </div>
      </section>

      {/* Styled global JSX */}
      <section className={styles.section}>
        <h3>Styled Global JSX</h3>
        <div className="global-jsx-card">
          <style jsx global>{`
            body {
              background: red;
            }
            .global-jsx-card {
              background: #f0f0f0;
              border-radius: 8px;
              padding: 20px;
              margin: 16px 0;
            }
            .global-jsx-title {
              color: #ff4081;
              font-size: 1.2em;
              margin-bottom: 12px;
            }
            .global-jsx-content {
              color: #333;
            }
          `}</style>
          <div className="global-jsx-title">Global Styled JSX Card</div>
          <div className="global-jsx-content">This card uses global Styled JSX styles</div>
        </div>
      </section>
      {/* Styled local + global JSX */}
      <section className={styles.section}>
        <h3>Styled Local + Global JSX</h3>
        <div className="local-jsx-card global-jsx-card ">
          <style jsx>{`
            .local-jsx-card {
              background: #e0f7fa;
            }
            .local-jsx-title {
              color: #00796b;
            }
            .local-jsx-content {
              color: #004d40;
            }
          `}</style>
          <div className="local-jsx-title global-jsx-title">Local + Global Styled JSX Card</div>
          <div className="local-jsx-content">This card combines local and global Styled JSX styles</div>
        </div>
      </section>
    </div>
  );
};
