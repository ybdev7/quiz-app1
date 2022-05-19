import { IEntity, IQuiz, QuizCategory } from "../interfaces/EntityInterfaces";
import {
  FilterableItem,
  FilterTerm,
  IFilterBuilder,
} from "../interfaces/Interfaces";

export const UNCHOOSABLE = -1;
export class FiltersFactory {
  static getRatingFilterItems = (): FilterableItem[] => {
    const filterItems: FilterableItem[] = [
      {
        displayName: "Choose Rating",
        displayValue: UNCHOOSABLE,
        filterName: FilterNames.Rating,
      },
      { displayName: "All", displayValue: 0, filterName: FilterNames.Rating },
      {
        displayName: "5 Stars",
        displayValue: 5,
        filterName: FilterNames.Rating,
      },
      {
        displayName: "4+ Stars",
        displayValue: 4,
        filterName: FilterNames.Rating,
      },
      {
        displayName: "3+ Stars",
        displayValue: 3,
        filterName: FilterNames.Rating,
      },
      {
        displayName: "2+ Stars",
        displayValue: 2,
        filterName: FilterNames.Rating,
      },
      {
        displayName: "1+ Stars",
        displayValue: 1,
        filterName: FilterNames.Rating,
      },
    ];
    return filterItems;
  };

  static getPriceFilterItems = (): FilterableItem[] => {
    const filterItems: FilterableItem[] = [
      {
        displayName: "Choose by Price",
        displayValue: UNCHOOSABLE,
        filterName: FilterNames.Popularity,
      },
      {
        displayName: "All",
        displayValue: 0,
        filterName: FilterNames.Price,
      },
      {
        displayName: "0 - $10",
        displayValue: 10,
        filterName: FilterNames.Price,
      },
      {
        displayName: "$11 - $20",
        displayValue: 20,
        filterName: FilterNames.Price,
      },
      {
        displayName: "$21 - $30",
        displayValue: 30,
        filterName: FilterNames.Price,
      },
      {
        displayName: "$31 - $40",
        displayValue: 40,
        filterName: FilterNames.Price,
      },
      {
        displayName: "$41- $50",
        displayValue: 50,
        filterName: FilterNames.Price,
      },
    ];
    return filterItems;
  };

  static getCategoryFilterItems = (): FilterableItem[] => {
    const filterItems: FilterableItem[] = [
      {
        displayName: "Choose Category",
        displayValue: UNCHOOSABLE,
        filterName: FilterNames.Category,
      },
      { displayName: "All", displayValue: 0, filterName: FilterNames.Category },
      {
        displayName: "Chemistry",
        displayValue: QuizCategory.Chemistry,
        filterName: FilterNames.Category,
      },
      {
        displayName: "French",
        displayValue: QuizCategory.French,
        filterName: FilterNames.Category,
      },
      {
        displayName: "History",
        displayValue: QuizCategory.History,
        filterName: FilterNames.Category,
      },
      {
        displayName: "Math",
        displayValue: QuizCategory.Math,
        filterName: FilterNames.Category,
      },
    ];
    return filterItems;
  };

  static getRatingTerm = (filterStr: FilterableItem): FilterTerm => {
    const filterTerm: FilterTerm = {
      filterName: filterStr.filterName,
      filterValue: filterStr,
      compFn: (item: any) => {
        //TBD
        return true;
      },
    };

    return filterTerm;
  };

  static getPriceTerm = (filterStr: FilterableItem): FilterTerm => {
    const filterTerm: FilterTerm = {
      filterName: filterStr.filterName,
      filterValue: filterStr,
      compFn: (item: any) => {
        return (
          // tbd
          true
        );
      },
    };

    return filterTerm;
  };

  static getCategoryTerm = (filterStr: FilterableItem): FilterTerm => {
    const filterTerm: FilterTerm = {
      filterName: filterStr.filterName,
      filterValue: filterStr,
      compFn: (item: any) => {
        return (
          filterStr.displayValue === 0 || //All
          filterStr.displayValue === UNCHOOSABLE ||
          (item as IQuiz).category === filterStr.displayValue
        );
      },
    };

    return filterTerm;
  };
}

export enum FilterNames {
  Rating,
  Category,
  Popularity,
  Price,
}
export abstract class BaseFilterBuilder implements IFilterBuilder<IEntity> {
  filters: Map<FilterNames, FilterableItem[]>;
  constructor() {
    this.filters = new Map();
  }

  getFilterDisplayLabel = (filterName: FilterNames): string => {
    switch (filterName) {
      case FilterNames.Rating:
        return "Rating";
      case FilterNames.Category:
        return "Genre";
      case FilterNames.Popularity:
        return "Popularity";
      case FilterNames.Price:
        return "Price";
      default:
        return "";
    }
  };

  getFilterItems = (filterName: FilterNames): FilterableItem[] => {
    const items = this.filters.get(filterName);
    //console.log(`itemslength=${items?.length}`);
    return items ? items : [];
  };

  getFilterTerm = (filterStr: FilterableItem): FilterTerm => {
    switch (filterStr.filterName) {
      case FilterNames.Rating:
        return FiltersFactory.getRatingTerm(filterStr);
      case FilterNames.Price:
        return FiltersFactory.getPriceTerm(filterStr);
      case FilterNames.Category:
        return FiltersFactory.getCategoryTerm(filterStr);
      default:
        return FiltersFactory.getRatingTerm(filterStr);
    }
  };

  public abstract getDefaultFilters: () => Map<FilterNames, FilterableItem>;

  public abstract getFilters: () => Map<FilterNames, FilterableItem[]>;

  public abstract getFilterTerms: () => FilterTerm[];
}

export class BookFiltersBuilder extends BaseFilterBuilder {
  constructor() {
    super();
    this.filters.set(FilterNames.Rating, FiltersFactory.getRatingFilterItems());
    this.filters.set(FilterNames.Price, FiltersFactory.getPriceFilterItems());
    // console.log(
    //   `Rating FilterableItems=${this.filters.get(FilterNames.Rating)?.length}`
    // );
  }

  public getFilters = (): Map<FilterNames, FilterableItem[]> => {
    return this.filters;
  };

  /**initial values for filters */
  public getFilterTerms = (): FilterTerm[] => {
    return [
      this.getFilterTerm({
        displayName: "All",
        displayValue: 0,
        filterName: FilterNames.Rating,
      }),
      this.getFilterTerm({
        displayName: "All",
        displayValue: 0,
        filterName: FilterNames.Price,
      }),
    ];
  };

  public getDefaultFilters = (): Map<FilterNames, FilterableItem> => {
    const deafults = new Map<FilterNames, FilterableItem>();
    deafults.set(
      FilterNames.Rating,
      this.getFilterItems(FilterNames.Rating)[0]
    );

    deafults.set(FilterNames.Price, this.getFilterItems(FilterNames.Price)[0]);
    return deafults;
  };
}

export class AuthorFiltersBuilder extends BaseFilterBuilder {
  constructor() {
    super();
    this.filters.set(FilterNames.Rating, FiltersFactory.getRatingFilterItems());
    this.filters.set(
      FilterNames.Category,
      FiltersFactory.getCategoryFilterItems()
    );
  }
  public getFilters = (): Map<FilterNames, FilterableItem[]> => {
    return this.filters;
  };

  public getDefaultFilters = (): Map<FilterNames, FilterableItem> => {
    const defaults = new Map<FilterNames, FilterableItem>();
    defaults.set(
      FilterNames.Rating,
      this.getFilterItems(FilterNames.Rating)[0]
    );

    defaults.set(
      FilterNames.Category,
      this.getFilterItems(FilterNames.Category)[0]
    );
    return defaults;
  };

  public getFilterTerms = (): FilterTerm[] => {
    return [
      this.getFilterTerm({
        displayName: "All",
        displayValue: 0,
        filterName: FilterNames.Rating,
      }),
      this.getFilterTerm({
        displayName: "All",
        displayValue: 0,
        filterName: FilterNames.Category,
      }),
    ];
  };
}
