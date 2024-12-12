import magnifyingGlass from '../../images/magnifying glass.png';
import styles from '../../styles/SearchBar.module.css';

function SearchBar({setSearch, placeholder}){

    return(
        <div className={styles.searchBar}>
            <label>
                <img className={styles.magnifyingGlass} src={magnifyingGlass} />
                <input type="search" placeholder={placeholder} onChange={(event) => setSearch(event.target.value)} />
            </label>
        </div>
    )
}

export default SearchBar;