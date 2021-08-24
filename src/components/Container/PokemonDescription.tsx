import React from 'react'
import heart from '../../assets/Heart1.png'

import {IPoki} from '../../interface'

import mobile from '../../store/mobile'
import showHeart from '../../store/showHeart'
import allPoki from '../../store/allPoki'
import {observer} from 'mobx-react-lite'
import pokemonFavorites from '../../store/pokemonFavorites'

export const PokemonDescription: React.FC<{
  id: number
  name: string
  image: string
  type: string
  ability: string
  abilityDescr: string
  allDescr: IPoki
}> = observer(({id, name, image, type, ability, abilityDescr, allDescr}) => {
  function addOrDeleteFavor(params: boolean) {
    if (params) {
      pokemonFavorites.setFavorites((currentList: [{}]) => [
        ...currentList,
        {
          id: id,
          name: name,
          image: image,
          type: type,
          favor: true,
          ability: ability,
          abilityDescr: abilityDescr
        }
      ])
      showHeart.heartDisable()

      //setShowHeartDescr(!params)
    } else {
      const todos = JSON.parse(localStorage.getItem('poki')!)

      todos.forEach((item: IPoki, index: number) => {
        if (item.id === id) {
          todos.splice(index, 1)
        }
      })
      pokemonFavorites.setFavorites(todos)

      showHeart.heartActive()
      //setShowHeartDescr(!params)
      //allDescr.favor = false
      allPoki.falseFavor(id)
    }
  }
  return (
    <div>
      <div
        className={
          mobile.mobileState ? 'view-description__mobile' : 'view-description'
        }>
        <div className="view-description__name">{name}</div>
        <div className="view-description__image">
          <img src={image} alt="" />
        </div>
        <div className="view-description__type">Class:{type}</div>
        <div className="view-description__ability">
          Ability: <span>{ability}</span>
        </div>
        <div className="view-description__abilityDescr"> {abilityDescr}</div>
        <div className="view-description__heart">
          <div onClick={() => addOrDeleteFavor(showHeart.heart)}>
            {
              <img
                className={
                  allDescr.favor
                    ? 'view-description__heart--active'
                    : 'view-description__heart--noactive'
                }
                src={heart}
                alt="heart"
                onClick={() => {
                  //allDescr.favor = true
                  allPoki.trueFavor(id)
                }}
              />
            }
          </div>
          <div className="view-description__back">
            <span
              onClick={() => {
                mobile.disableMobile()
              }}>
              Назад
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PokemonDescription
