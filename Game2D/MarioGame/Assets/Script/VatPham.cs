using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VatPham : MonoBehaviour
{
    private float donay = 0.5f;
    private float tocdonay = 4f;
    private bool duocnay = true;
    private Vector2 vitribandau;
    public bool chuanam = false;
    public bool chuaxu = false;
    private bool chuasao = false;

    private AudioSource amthanh;
    GameObject Mario;
    Vector2 vitrichet;
    GameObject dongxu = null;

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.collider.tag == "Player" && collision.contacts[0].normal.y > 0)
        {
            vitribandau = transform.position;
            KhoiNayLen();
        }
    }
    void KhoiNayLen()
    {
        if (duocnay)
        {
            StartCoroutine(KhoiNay());
            if (chuanam == true)
            {
                NamVsHoa();
            }
            else if (chuaxu == true)
            {
                DongXu();
            }
        }
    }
    IEnumerator KhoiNay()
    {
        while (true)
        {
            transform.position = new Vector2(transform.position.x, transform.position.y + tocdonay * Time.deltaTime);
            if (transform.position.y >= vitribandau.y + donay) break;
            yield return null;
        }
        while (true)
        {
            transform.position = new Vector2(transform.position.x, transform.position.y - tocdonay * Time.deltaTime);
            if (transform.position.y <= vitribandau.y) break;
            if (gameObject.transform.parent.name.Equals("BiAn"))
            {
                Destroy(gameObject);
                GameObject orong = (GameObject)Instantiate(Resources.Load("Prefabs/KhoiRong"));
                orong.transform.position = vitribandau;
                duocnay = false;
            }
            else
            {
                
            }
            yield return null;
        }
    }

    void NamVsHoa()
    {
        int capdohientai = Mario.GetComponent<MarioScript>().capdo;
        GameObject nam = null;
        if (capdohientai == 0)
        {
            nam = (GameObject)Instantiate(Resources.Load("Prefabs/NamThuong"));
        } else
        {
            nam = (GameObject)Instantiate(Resources.Load("Prefabs/NamLua"));
        }
        nam.transform.SetParent(this.transform.parent);
        nam.transform.position = new Vector2(vitribandau.x, vitribandau.y + 1f);
        Mario.GetComponent<MarioScript>().TaoAmThanh("namxuathien");
        chuanam = false;
    }

    void DongXu()
    {
        dongxu = (GameObject)Instantiate(Resources.Load("Prefabs/Xu"));
        dongxu.transform.SetParent(this.transform.parent);
        dongxu.transform.position = new Vector2(vitribandau.x, vitribandau.y + 1.5f);
        Mario.GetComponent<MarioScript>().TaoAmThanh("anxu");
        chuaxu = false;
    }

}
