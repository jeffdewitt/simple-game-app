import axios from 'axios'
import converter from 'xml-js'
import { BGG_URL } from 'config/constants'

export function queryGames (searchText) {
  return axios.get(`${BGG_URL}/search?type=boardgame&query=${encodeURI(searchText)}`)
    .then(({data}) => {
      const rawData = JSON.parse(converter.xml2json(data, {compact: true, spaces: 2}))
      const items = rawData.items.item

      return items ? items.map((item) => {
        return {name: item.name._attributes.value, id: item._attributes.id}
      }) : []
    }).catch((error) => error)
}

export function fetchGameData (id) {
  return axios.get(`${BGG_URL}/thing?id=${id}`)
    .then(({data}) => {
      const rawData = JSON.parse(converter.xml2json(data, {compact: true, spaces: 2}))
      return rawData.items.item || {}
    }).catch((error) => error)
}
