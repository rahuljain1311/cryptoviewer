module AskFooterView where

import Prelude
import Control.Monad.Eff (Eff)
import Data.Unit (Unit)
import React.Redux as Redux
import Native (push)
import AskFooter

-- stateToProps :: Record state -> Record ownProps -> Record stateProps
stateToProps _ xs = xs

redirectUrl
  :: forall eff obj
   . String
  -> Eff ( | eff) { | obj }
redirectUrl url =  push url


-- dispatchToProps :: forall eff. Redux.BaseDispatch eff action -> Record ownProps -> Record dispatchProps
dispatchToProps :: forall a eff obj. (Eff ( | eff ) { | obj } -> a) -> { routeToUrl :: String -> Unit -> a }
dispatchToProps dispatch = { routeToUrl: \url -> \_ -> dispatch $ redirectUrl url}

--askFooterView = Redux.connect stateToProps dispatchToProps
--askFooterView = connect stateToProps dispatchToProps

