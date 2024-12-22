import React, {Suspense} from 'react'
import { Outlet } from "react-router-dom";
import Header from '../Header';
import Footer from '../Footer';
import Spinner from '../Spinner';

function Landing({loading, showAdds}) {
  return (
    <div id="root">
        <div className="hayaanJjjA hayaanJjjA-mod-bg-color-elevation-app-surface relative">
            <Header showAdds={showAdds} />

            <div className="App relative">
            {loading ? (
              <Spinner />
            ) : (
              <Suspense fallback={<Spinner />}>
                <Outlet />
              </Suspense>)}
            </div>
        </div>

        <div className="hayaanBJsM hayaanBJsM-with-drawer hayaanBJsM-compact-search hayaanBJsM-new-nav-breakpoints">
            <div className="hayaankml-layout edges c31EJ">
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default Landing
