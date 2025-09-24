const Footer = () => {

    let thisYear = new Date().getFullYear();

    return (
        <footer>
            <div>
                &copy; {thisYear} Midtown Art Gallery 
            </div>
            <div>
                123 Main Street &bull; Saint Louis, MO 63101 &bull; (314) 555-1234 &bull; info@magstl.com
            </div>
        </footer>
    )
}

export default Footer;