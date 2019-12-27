class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        } else {
            this.message = '操作成功'
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message, code) {
        super(data, message, code)
        this.code = code ? code : 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message, code) {
        super(data, message, code)
        this.code = code ? code : -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}