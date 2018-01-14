module Utils.Helpers where

import Unsafe.Coerce (unsafeCoerce)
import React (ReactElement)
import Data.Nullable
import Prelude
import Data.Maybe

ire :: ReactElement
ire = unsafeCoerce $ toNullable (Nothing)

