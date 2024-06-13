type Model = {
  id: number | string | undefined
}

interface SelectedItemsMethods<T> {
  getSelectedItems(): T[]
}

export type SelectedItemsRaw = {
  selected_all: boolean
  selected: any[]
  excluded: any[]
}

export type Penis = {
  id: string | number | undefined
}

export abstract class BaseSelectedItems<T extends Model>
  implements SelectedItemsMethods<T>
{
  selectedAll: boolean
  selected: T[]
  excluded: T[]

  constructor() {
    this.selectedAll = false
    this.selected = []
    this.excluded = []
  }

  toRaw(): SelectedItemsRaw {
    return {
      selected_all: this.selectedAll,
      selected: this.selected.map((el) => el.id),
      excluded: this.excluded.map((el) => el.id),
    }
  }

  getSelectedItems(): T[] {
    throw new Error('Method not implemented.')
  }

  clear() {
    this.selectedAll = false
    this.selected = []
    this.excluded = []
  }
}
