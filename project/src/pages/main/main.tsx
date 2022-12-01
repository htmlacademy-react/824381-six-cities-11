import { useState, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CardClassName, SortType } from '../../const';
import { Offer } from '../../types/offer';
import { getCity } from '../../store/app-action-process/selectors';
import { getOffers } from '../../store/data-process/selectors';
import { selectCity } from '../../store/action';
import CardsList from '../../components/cards-list/cards-list';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import SortList from '../../components/sort-list/sort-list';

function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const [activeSortItem, setActiveSortItem] = useState<string>(SortType.Popular);

  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);

  const city = useAppSelector(getCity);
  const setCity = useCallback((cityItem: string) => dispatch(selectCity(cityItem)), [dispatch]);
  const currentOffers = useMemo(() => offers.filter((offer) => offer.city.name === city), [offers, city]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList selectedCity={city} setCity={setCity}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {city}</b>
              <SortList activeSortItem={activeSortItem} setActiveSortItem={setActiveSortItem} />
              <div className="cities__places-list places__list tabs__content">
                <CardsList offers={currentOffers} activeSortItem={activeSortItem} getActiveCard={setActiveCard} cardClassName={CardClassName.Main} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {currentOffers[0]?.city && <Map offers={currentOffers} activeCard={activeCard} city={currentOffers[0].city} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
