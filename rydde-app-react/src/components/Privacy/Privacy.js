import './Privacy.css'

function Privacy() {
    const handlePricacyToggle = event => {
        const consentForm = document.querySelector('.consent-form-container');
        consentForm.classList.toggle('active');

        event.target.classList.toggle('active');
    }

    return (
        <>
            <button onClick={handlePricacyToggle} className='consent-button-toggler active'>§</button>
            <div className='consent-form-container active'>
                <h1>Privacy Policy</h1>
                <p>Our Privacy Policy is in compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679. This policy is effective as of 2021-02-19.
                    If you do not wish to ave your personal information collected, saved and used. Click <a href='https://downloadmoreram.com/'>here</a>.</p>
            </div>
        </>
    )
} 

export default Privacy;