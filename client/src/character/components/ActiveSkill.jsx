import React       from 'react';
import PropTypes   from 'prop-types';

function ActiveSkill(props) {
  let skill   = props.data.skill;
  let rune    = props.data.rune;
  let imgSrc  = `http://media.blizzard.com/d3/icons/skills/64/${skill.icon}.png`;

  return (
    <div>
      {skill &&
        <div className="skill-box">
          <h2  className="text-center">{skill.name}</h2>
          <div className="skill-midbox">
            <img src={imgSrc} alt="skill"/>
            <p> {skill.description}</p>
          </div>

          <p>gained at level    : {skill.level}</p>
          <p>category           : {skill.categorySlug}</p>
          <p>tooltipURL         : {skill.tooltipUrl}</p>
          <p>simpleDescription  : {skill.simpleDescription}</p>
        </div>
      }
      {rune &&
        <div>
          <h1>Rune</h1>
          <h2>{rune.name}</h2>
          <p>name             : {rune.name}</p>
          <p>gained at level  : {rune.level}</p>
          <p>description      : {rune.description}</p>
          <p>tooltip params   : {rune.tooltipParams}</p>
        </div>
      }
    </div>
  );
}

ActiveSkill.propTypes = {
  data: PropTypes.shape({
    skill: PropTypes.shape({
      icon               : PropTypes.string 
    , level              : PropTypes.number 
    , categorySlug       : PropTypes.string 
    , toolTipUrl         : PropTypes.string 
    , description        : PropTypes.string 
    , simpleDescription  : PropTypes.string 
    }).isRequired
    
  , rune: PropTypes.shape({
      name            : PropTypes.string 
    , level           : PropTypes.number 
    , description     : PropTypes.string 
    , tooltipParams   : PropTypes.string 
    }).isRequired
  })
};

export default ActiveSkill;