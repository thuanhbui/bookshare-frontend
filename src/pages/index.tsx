import { Header } from '../components/header'
import { ItemComponent } from '../components/item'
import { HomePage } from '../templates/homepage'

const Home: React.FC<{ homepageContent: any }> = () => {
  return (
    <div>
      <Header/>
      <div style={{height: 50}}></div>
      <ItemComponent/>
    </div>
  )
}

export default Home
