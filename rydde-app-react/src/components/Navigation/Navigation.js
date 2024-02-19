import './Navigation.css';

function Navigation(props) {
    return(
        <nav>
            <div className='nav-link-container'>
                <p className={`nav-link ${props.siteNumber === 1 ? 'active' : ''}`} onClick={() => props.setSiteNumber(1)}>Family</p>
                <p className={`nav-link ${props.siteNumber === 2 ? 'active' : ''}`} onClick={() => props.setSiteNumber(2)}>User</p>
                <p className={`nav-link ${props.siteNumber === 3 ? 'active' : ''}`} onClick={() => props.setSiteNumber(3)}>Home</p>
                <div className='fansy-shit' style={{left: props.siteNumber === 1 ? '0.5%' : props.siteNumber === 2 ? '34%' : '66.4%'}}></div>
            </div>
        </nav>
    )
}

export default Navigation;