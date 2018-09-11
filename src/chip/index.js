import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import defaultTheme from './theme.scss';

const DeleteIcon = ({classes, handleClick}) => {
  function handleDeleteClick(e) {
    e.stopPropagation();
    return handleClick(e);
  }
  return (
    <button onClick={handleDeleteClick} className={classes}>X</button>
  )
}

const Chip = ({
  theme,
  label,
  size,
  color,
  avatar: avatarElement,
  outlined,
  handleDelete,
  handleChipClick,
  ...props
}) => {
  const Element = !handleChipClick ? 'div' : 'a';

  const classes = classnames(theme.chip, theme[size],
    theme[outlined ? `${color}Outlined` : color],
    {[theme.clickable]: Element === 'a'}
  )
  /* Avatar related block */
  let avatar = null;
  if(avatarElement && React.isValidElement(avatarElement)) {
    avatar = React.cloneElement(avatarElement, {
      className: classnames(avatarElement.props.className,
        theme[`${size}Avatar`]
      )
    })
  } else if (typeof avatarElement === 'string' ) {
    avatar = <img src={avatarElement} alt='A' className={classnames(theme[`${size}Avatar`])}/>
  }

  /* DeleteIcon related block */
  let deleteIcon = null;
  if(handleDelete) {
    const customClasses = classnames(theme.deleteIcon,
        theme[size && `${size}Delete`],
        theme[outlined ? color : `${color}Outlined`]
    )
    deleteIcon =  <DeleteIcon classes={customClasses} handleClick={handleDelete}/>
  }


  return (
    <Element href='#' className={classes} {...props} onClick={Element === 'a' ? handleChipClick : ()=> {}}>
      { avatar }
      <span className={theme.label}>{ label }</span>
      { deleteIcon }
    </Element>
  )
}

Chip.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  outlined: PropTypes.bool,
  handleDelete: PropTypes.func,
};

Chip.defaultProps = {
  label: 'default chip',
  color: 'secondary',
  size: 'medium',
};

export default themr('CBChips', defaultTheme)(Chip);