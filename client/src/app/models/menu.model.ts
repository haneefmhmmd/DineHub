export class MenuItem {
  constructor(
    public category: string,
    public name: string,
    public image: string,
    public description: string,
    public price: number
  ) {}
}
export class Menu {
  constructor(
    public restaurantMenu: { category: string; items: MenuItem[] }[]
  ) {}
}
