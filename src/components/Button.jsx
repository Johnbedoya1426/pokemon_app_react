import '../sass/Button.scss';

const Button2 = ({icon, handleClick, disabled}) => {
  return (
    <div className='button__box'>
      { !disabled && 
        <button className="button" 
        onClick={handleClick}
         disabled={disabled}>{icon}</button>
      }
        <div className='button__shadow'></div>
    </div>
   
  )
}

export {Button2}