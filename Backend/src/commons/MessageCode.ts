export enum MessageCode {
	USER_NOT_FOUND = 'Không tìm thấy thông tin người dùng',
	USER_NOT_REGISTER = 'Bạn chưa đăng ký dịch vụ, vui lòng liên hệ quản trị hệ thống để đăng ký',
	USER_IS_DELETED = 'Tài khoản đã bị khóa',
	USER_ALREADY_EXISTED = 'Tên người dùng đã tồn tại trong hệ thống',
	USER_CREATE_ERROR = 'Không thể đăng ký ngay lúc này',
	USER_PASSWORD_WRONG = 'Tên người dùng hoặc mật khẩu không chính xác',
	USER_NOT_HAVE_PERMISSION = 'Bạn không có quyền truy cập chức năng này',
	USER_INVALID_TOKEN = 'Token không hợp lệ hoặc đã hết hạn',

	PRODUCT_NOT_FOUND = 'Không tìm thấy thông tin sản phẩm',

	HISTORY_NOT_FOUND = 'Không tìm thấy thông tin lịch sử',

	UNKNOWN_ERROR = 'Lỗi không xác định'
}
