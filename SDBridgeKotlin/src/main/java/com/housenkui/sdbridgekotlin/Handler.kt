package com.housenkui.sdbridgekotlin

import com.google.gson.internal.LinkedTreeMap

interface Handler {
    fun handler(map: HashMap<String, Any>?, callback: Callback)
}