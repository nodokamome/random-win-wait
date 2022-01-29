import { NextPage } from 'next'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: React.ReactNode;
};

const Layout: NextPage<Props> = (props: Props) => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
