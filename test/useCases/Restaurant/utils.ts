import { Repositories } from '@/repositories'
import RegisterItem from '@/interactors/restaurant/RegisterItem'
import ResgisterRestaurant from '@/interactors/restaurant/RegisterRestaurant'
import Restaurant, { Address, Item } from '@/interactors/restaurant/Restaurant'

export async function createRestaurant (repository: Repositories): Promise<Restaurant> {
  const resgisterRestaurant = new ResgisterRestaurant(repository.restaurant)

  const address: Address = {
    city: 'Belo Horizonte',
    street: 'Rua Doutor Lund',
    postcode: '31150-410',
    complement: '',
    state: 'MG',
    number: '1002',
    district: 'Santa Cruz'
  }

  const phone = '31988621608'

  const restaurant = await resgisterRestaurant.execute({
    name: 'Uai Food',
    gastronomy: 'Brasileira',
    address,
    phone
  })
  return restaurant
}

export async function createItem (restaurantID: string, repository: Repositories): Promise<Item> {
  const registerItem = new RegisterItem(repository.restaurant)

  const item = await registerItem.execute(restaurantID, {
    name: 'Pão de Queijo',
    description: 'Pão de Queijo mineiro legítimo',
    price: '3,90',
    type: 'FOOD'
  })

  return item
}
