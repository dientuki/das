# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

module UtilsHelper

  @@cycle_pos = 0
  @@first5_pos = 0
  @@first5_tw = 0

  def assets_url
    @@cycle_pos = (@@cycle_pos.nil? || @@cycle_pos > 2) ? 0 : @@cycle_pos+1
    @site.config[:asset_url].gsub('%s', "st#{@@cycle_pos}")
  end
  
  def current_url
    #@site.config[:base_url]
    #return item[:filename][7..-1]
  end
  
  def base_url
    @site.config[:base_url]
  end  
  
  def test_form
    @site.config[:test_form]
  end   

  def first5_fb
    @@first5_pos = (@@first5_pos.nil? ? 1 : @@first5_pos+1)
    if @@first5_pos < 5
      return "http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdozer.pressbox.com.ar%2Foutput%2F&locale=es_ES&layout=button_count&show_faces=false&width=200&action=like&colorscheme=light&height=21"
    else
      return "about:blank"
    end
  end

  def first5_tw
    @@first5_tw = (@@first5_tw.nil? ? 1 : @@first5_tw+1)
    if @@first5_tw < 5
      "http://platform0.twitter.com/widgets/tweet_button.html?_=1299254551029&count=horizontal&lang=es&related=todapasion%3ALa%20tribuna%20del%20hincha%20en%20la%20web&text=Loren%20ipsum%20dolor%20sit%20amet&url=http%3A%2F%2Fdozer.pressbox.com.ar%2Fnoticias%2F39394949-lorem-ipsum-dolor-sit-amet&via=tn_todonoticias"
    else
      return "about:blank"
    end
  end

  def reset_first5
    @@first5_pos = 0
    @@first5_tw = 0
  end

end

include Nanoc3::Helpers::Rendering
include UtilsHelper
