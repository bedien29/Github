using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MarioScript : MonoBehaviour
{
    private float vantoc=7;     //vận tốc chuyển động ban đầu của mario

    private float tocdo=0;      // tốc độ chuyển động của mario

    private float tocdotoida = 14f;     // tốc độ tối đa của mario

    private float nhaycao=465;          // độ cao nhảy tối đa của mario

    private float nhaythap=5;           

    private float roixuong=3;       // tốc độ rơi xuống của mario

    private bool chamdat=true;      // kiểm tra mario có chạm đất hay không

    private bool chuyenhuong=false; // kiểm tra mario có đang chuyển hướng hay không

    public bool quayphai = true;   // hướng mặt của mario: phải / trái

    private float giuphim = 0.2f;   // mốc thời gian giữ phím đặt ra

    private float thoigiangiuphim=0;    // thời gian giữ phím của người dùng

    public int capdo = 0;       // cấp độ của mario (0,1,2)

    public bool bienhinh=false;     // kiếm tra trạng thái biến hình của mario

    private Animator player;    // mario
    private Rigidbody2D r2d; // thực thể vật lý

    GameObject phanleo;

    private AudioSource amthanh;

    private Vector2 vitrichet;

    public bool bandan = false;

    private Vector2 vitridan;

    GameObject bullet;

    GameObject gioihan;

    GameObject cotco;

    GameObject laco;

    public int soxu;

    GameObject dich;
    

    // Start is called before the first frame update
    void Start()
    {
        soxu = 0;
        r2d = GetComponent<Rigidbody2D>();
        player = GetComponent<Animator>();
        amthanh = GetComponent<AudioSource>();
        TaoAmThanh("amthanhnen");
    }

    void Awake()
    {
        cotco = GameObject.Find("Cotco");
        laco = GameObject.Find("CoVietNam");
        phanleo = GameObject.FindGameObjectWithTag("Leo");
        dich = GameObject.FindGameObjectWithTag("dich");
    }

    // Update is called once per frame
    void Update()
    {
        player.SetFloat("TocDo",tocdo);
        player.SetBool("ChamDat",chamdat);
        player.SetBool("ChuyenHuong",chuyenhuong);

        NhayLen();
        if (bienhinh == true)
        {
            switch (capdo)
            {
                case 0:
                    {
                        StartCoroutine(HoaNho());
                        bienhinh = false;
                        TaoAmThanh("nhodi");
                        break;
                    }
                case 1:
                    {
                        StartCoroutine(AnNam());
                        bienhinh = false;
                        TaoAmThanh("lonlen");
                        break;
                    }
                case 2:
                    {
                        StartCoroutine(AnHoa());
                        bienhinh = false;
                        TaoAmThanh("lonlen");
                        break;
                    }
                default:
                    {
                        bienhinh = false;
                        break;
                    }
            }
        }

        if (capdo == 2)
        {
            bandan = true;
            if (Input.GetKeyDown(KeyCode.X))
            {
                BanDan();
            }
        }
        else
        {
            bandan = false;
        }

        VeDich();

    }
    private void FixedUpdate(){
        DiChuyen();
        MarioRoiVuc();
        PhaBoGioiHan();
        
    }
    void DiChuyen(){
        // kiểm tra di chuyển sang phải hay trái (0->-1: sang trái, 0->1: sang phải) / gia tốc chuyển động
        float DiChuyenToiLui = Input.GetAxis("Horizontal");
        // vận tốc của vật thể (mario) theo phương ngang (phương Y)
        r2d.velocity = new Vector2(vantoc*DiChuyenToiLui, r2d.velocity.y);
        // tốc độ di chuyển của vật thể bằng vận tốc nhân gia tốc
        tocdo = Mathf.Abs(vantoc*DiChuyenToiLui);
        // cài đặt hướng quay mặt của mario
        if(DiChuyenToiLui>0 && !quayphai) HuongMat();
        if(DiChuyenToiLui<0 && quayphai) HuongMat();
    }

    void HuongMat(){
        // nếu mario quay mặt sang trái
        quayphai = !quayphai;
        Vector2 HuongQuay = transform.localScale;
        // đổi chiều mario transform.localScale.X = 1: hướng mặt mặc định của mario (phải),
        // transform.localScale.X=-1: quay mặt ngược lại (trái)
        HuongQuay.x *= -1;
        transform.localScale = HuongQuay;
        if(tocdo>2) StartCoroutine(ChuyenHuong());
    }

    void NhayLen(){
        // Input.GetKeyDown trả về giá trị true khi người dùng nhấn phím 
        if(Input.GetKeyDown(KeyCode.Z) && chamdat==true){
            // tác dụng lực lên vật thể. bổ sung lực theo thời gian, sử dụng khối lượng
            // Vật sẽ được gia tốc bởi lực theo quy luật lực = khối lượng x gia tốc
            // khối lượng càng lớn thì lực cần dùng để gia tốc đạt một tốc độ nhất định.
            r2d.AddForce((Vector2.up)*nhaycao);
            TaoAmThanh("nhay");
            chamdat = false;
        }
        // áp dụng trọng lực
        if(r2d.velocity.y<0){
            // physics2d.gravity : gia tốc do trọng lực
            // time.deltatime: thời gian khung hình cuối đến khung hình hiện tại
            r2d.velocity += Vector2.up * Physics2D.gravity.y * (roixuong-1)*Time.deltaTime;
        } else if(r2d.velocity.y>0 && !Input.GetKey(KeyCode.Z)) {
            r2d.velocity+=Vector2.up * Physics2D.gravity.y * (nhaythap-1)*Time.deltaTime;
        }
    }

    private void OnTriggerEnter2D(Collider2D collider){
        if(collider.tag=="NenDat"){
            chamdat=true;
        }
        if (collider.tag == "Xu")
        {
            soxu++;
            TaoAmThanh("anxu");
            Destroy(collider.gameObject);
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.collider.tag == "DanChim")
        {
            MarioChet();
        }
    }

    private void OnTriggerStay2D(Collider2D collider){
        if(collider.tag=="NenDat"){
            chamdat = true;
        }
        

    }

    IEnumerator ChuyenHuong(){
        chuyenhuong =true;
        yield return new WaitForSeconds(0.2f);
        chuyenhuong = false;
    }

    

    // thay đổi độ lớn của mario
    IEnumerator AnNam(){
        float dotre = 0.1f;
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"), 0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"), 1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"), 0);
        yield return new WaitForSeconds(dotre);
    }

    IEnumerator AnHoa(){
        float dotre = 0.1f;
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),1);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),1);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),1);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"), 0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"), 0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"), 1);
        yield return new WaitForSeconds(dotre);
    }

    IEnumerator HoaNho(){
        float dotre = 0.1f;
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"),0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"),1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"),0);
        yield return new WaitForSeconds(dotre);
        player.SetLayerWeight(player.GetLayerIndex("MarioNho"), 1);
        player.SetLayerWeight(player.GetLayerIndex("MarioLon"), 0);
        player.SetLayerWeight(player.GetLayerIndex("MarioLua"), 0);
        yield return new WaitForSeconds(dotre);
    }

    public void TaoAmThanh(string FileAmThanh){
        amthanh.PlayOneShot(Resources.Load<AudioClip>("Audio/"+FileAmThanh));
    }


    public void MarioChet()
    {
        vitrichet = transform.position;
        GameObject MarioChet = (GameObject)Instantiate(Resources.Load("Prefabs/MarioChet"));
        MarioChet.transform.position = vitrichet;
        Destroy(gameObject);
    }

    public void BanDan()
    {
        bullet = (GameObject)Instantiate(Resources.Load("Prefabs/Dan"));
        if(quayphai)
            bullet.transform.position = new Vector3(transform.position.x + 1.5f, transform.position.y + 1.0f, -1f);
        else
            bullet.transform.position = new Vector3(transform.position.x - 1.5f, transform.position.y + 1.0f, -1f);
        TaoAmThanh("bandan");
    }

    void MarioRoiVuc()
    {
        if (gameObject.transform.position.y <= -6f)
        {
            MarioChet();
        }
    }

    void PhaBoGioiHan()
    {
        gioihan = GameObject.FindGameObjectWithTag("GioiHan");
        if (gioihan.transform.position.x - gameObject.transform.position.x <= 2f)
        {
            Destroy(gioihan);
        }
    }

    void VeDich()
    {
        if(transform.position.x >= 185f)
        {
            SceneManager.LoadScene("Winning");
        }
    }
}
