require 'test_helper'

class UploadMailerTest < ActionMailer::TestCase
  test "upload_link" do
    mail = UploadMailer.upload_link
    assert_equal "Upload link", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
