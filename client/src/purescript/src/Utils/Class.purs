module Utils.Class where

import Prelude
import Data.Array
import Data.Semigroup
import Data.Monoid
import Data.Maybe
import Data.Tuple (Tuple(..))

type Classy = Tuple String Boolean

classNames :: Array Classy -> String
classNames xs = case uncons xs of
                  Just { head: Tuple x' y', tail:xs } -> (if y' then x' else mempty) <> " " <> classNames xs
                  Nothing -> mempty

tclass :: String -> Classy
tclass str = Tuple str true
