# Preview all emails at http://localhost:3000/rails/mailers/upload_mailer
class UploadMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/upload_mailer/upload_link
  def upload_link
    UploadMailer.upload_link
  end

end
