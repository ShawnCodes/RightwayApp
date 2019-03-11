class UploadsController < ApiController
  include Shortener

  def index
    uploads = Upload.all
    render json: { uploads: uploads }
  end

  def show
    upload = Upload.find(params[:id])
    render json: { upload: upload }
  end

  def create
    owner = User.create_with(username: upload_params[:email], name: upload_params[:email], password: 'password').find_or_create_by(email: upload_params[:email])
    upload = Upload.new(upload_params.except(:email))
    upload.user_id = owner.id

    if upload.save
      render json: { message: 'ok' , upload: upload }
    else
      puts upload.errors.full_messages
      render json: { message: 'unable to create' }, status: :unprocessable_entity
    end
  end

  def request_link
    email = params[:email]
    full_url = "http://localhost:3000/upload?email=#{email}"
    shortened_url = Shortener::ShortenedUrl.generate(full_url)
    if email.length > 0
      UploadMailer.upload_link(email, full_url).deliver_now
      render json: { message: 'Email sent successfully' }
    else
      render json: { message: 'No email attached' }, status: :unprocessable_entity
    end
  end

  private
    def upload_params
      params.require(:upload).permit([
        :name,
        :description,
        :email,
        :file
      ])
    end
end
