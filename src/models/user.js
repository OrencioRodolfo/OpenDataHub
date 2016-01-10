var user_schema = new Schema({
	first_name 	: String,
	last_name 	: String,
	email 		: String,
	address 	: {
					country: {
						type: Schema.ObjectId,
						ref: 'country'
					},
					city: String,
					street: String,
					zip_code: String
				},
	organization 		: String,
	organization_role 	: String,
	username			: String,
	password			: String,
	purpose				: String,
	hash				: String
});


var User_m 		= mongoose.model('user', user_schema, 'user');
