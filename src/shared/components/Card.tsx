import { FC, ReactNode, useState } from 'react';
import style from './Card.module.scss';

interface CardProps {
  label: string;
  background?: ReactNode;
  onClick?: () => void;
  buttons?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const Card: FC<CardProps> = ({
  label,
  background,
  onClick,
  buttons,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={style.cardButton}
      onClick={() => onClick && onClick()}
      role='button'
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {background && <div className={style.background}>{background}</div>}

      <span>{label}</span>

      {buttons && buttons.length > 0 && isHovered && (
        <div className={style.buttonsContainer}>
          {buttons.map((button, index) => (
            <button key={index} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
